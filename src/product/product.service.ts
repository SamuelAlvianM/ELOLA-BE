/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,) {}

  async get_product_taxes_promos( product_id: number) {
    const product = await this.prisma.product.findUnique({
      where: { product_id: product_id },
      include: {
        ProductTax: {
          include: {
            tax: true,
          },
        },
        ProductPromo: {
          include: {
            promo: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    const isPromoIncluded = product.ProductPromo.length > 0;
    const isTaxIncluded = product.ProductTax.length > 0;
  
    return {
      product,
      alerts: {
        promoIncluded: isPromoIncluded ? 'This product is under a promo' : 'No active promo for this product',
        taxIncluded: isTaxIncluded ? 'This product has tax applied' : 'No tax applied to this product',
      },
    };
  }

  async add_tax_product(product_id: string, tax_id: string) {
    return this.prisma.productTax.create({
      data: {
        product_id: parseInt(product_id),  // Convert to integer
        tax_id: parseInt(tax_id)
      },
    });
  }

  async remove_tax_product(product_id: number, tax_id: number) {
    return this.prisma.productTax.delete({
      where: {
        product_id_tax_id:{
          product_id: product_id,
          tax_id: tax_id,
        },
      },
    });
  }

  async create_product(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    })
  }

  async get_product_by_page(page: number, limit: number, category?: string, product_name?: string) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;

    const condition: any = {
      deleted_at: null,
    };

    if(category) {
      condition.product_category = {
        category_name: category,
      };
    }

    if(product_name) {
      condition.product_name = {
        contains: product_name,
        mode: 'insensitive',
      };
    }

    const [products, totalCount] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: condition,
        skip: skip,
        take: normalLimit,
        include: {
          product_category: true,
        },
      }),
      this.prisma.product.count({
        where: condition,
      }),
    ]);

    return {
      data: products,
      meta: {
        "Current Page": page,
        "Items per Page": normalLimit,
        "Total Pages": Math.ceil(totalCount / limit),
        "Total Items": totalCount,
      },
    };
  }
  
  async find_all_products() {
    return this.prisma.product.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async findOne(product_id: number) {
    return this.prisma.product.findUnique({
      where: { 
        product_id,
        deleted_at: null, 
      },
    });
  }

  async update(product_id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: {product_id},
      data,
    })
  }
  async remove(product_id: number): Promise<Product> {
    return this.prisma.product.update({
      where: { product_id },
      data: { deleted_at: new Date()}
    });
  }
}
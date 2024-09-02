/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,) {}

  async get_product_taxes_promos( product_id: number) {
    return this.prisma.product.findUnique({
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
  }

  async add_tax_product(product_id: number, tax_id: number) {
    return this.prisma.productTax.create({
      data: {
        product_id: product_id,
        tax_id: tax_id,
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

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    })
  }
  

  async findAll(page: number, limit: number) {
    const maxLimit = 100;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;
    const [products, totalCount] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normalLimit,
      }),
      this.prisma.product.count({
        where: {
          deleted_at: null,
        },
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
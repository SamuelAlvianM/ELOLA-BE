/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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

  async add_promo_product(product_id: number, promo_id: number) {
    return this.prisma.productPromo.create({
      data: {
        product_id: product_id,
        promo_id: promo_id,
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

  async remove_promo_product(product_id: number, promo_id: number) {
    return this.prisma.productPromo.delete({
      where: {
        product_id_promo_id: { product_id: product_id, promo_id: promo_id},
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    const { product_price, ...rest } = createProductDto;

    const promo = await this.prisma.promo.findFirst({
      where: {
        product_id: rest.product_code
      },
      orderBy: {
        end_date: 'desc'
      }
    });

    const final_price = promo ? product_price + promo.promo_value : product_price;

    return this.prisma.product.create({
      data: {
        ...rest,
        product_price: final_price,
      }
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { product_id: id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { product_price, ...rest } = updateProductDto;
    const promo = await this.prisma.promo.findFirst({
      where: {
        product_id: rest.product_code
      },
      orderBy: {
        end_date: 'desc'
      },
    });

    const final_price = product_price && promo ? product_price + promo.promo_value : product_price;
    
    return this.prisma.product.update({
      where: { product_id: id },
      data: {
        ...rest,
        ...(product_price && { product_price: final_price }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { product_id: id },
    });
  }
}

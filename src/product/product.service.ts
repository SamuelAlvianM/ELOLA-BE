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
        product_id_promo_id: {
          product_id: product_id,
          promo_id: promo_id,
        },
      },
    });
  }

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    })
  }
  async findAll() {
    return this.prisma.product.findMany({
      where: {
        deleted_at: null,
      }
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
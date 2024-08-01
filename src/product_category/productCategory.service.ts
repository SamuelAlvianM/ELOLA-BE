/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.productCategory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.productCategory.findUnique({
      where: { product_category_id: id },
    });
  }

  async update(id: number, data: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({
      where: { product_category_id: id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.productCategory.delete({
      where: { product_category_id: id },
    });
  }
}
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';
import { ProductCategory } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductCategoryDto) {
    return this.prisma.productCategory.create({
      data,
    });
  }
  
  async getAllProductCategory(): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany({
      where: {
        deleted_at: null
      },
    })
  }

  async getProductCategoryById(product_category_id: number): Promise<ProductCategory> {
    const category = await this.prisma.productCategory.findFirst({
      where:{
        product_category_id: product_category_id,
        deleted_at: null
      },
    });
    
    if (!category) {
      throw new NotFoundException(`Category Product with ID ${product_category_id} not found or has been deleted.`);
    }
    
    return category;
  }


  async update(product_category_id: number, data: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({
      where: { product_category_id: product_category_id },
      data,
    });
  }

  async softDeleteProductCategory(product_category_id: number){
    return this.prisma.productCategory.update({
      where: {
        product_category_id: product_category_id
      },
      data: {
        deleted_at: new Date()
      },
    })
  }
}
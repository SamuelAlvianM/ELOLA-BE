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

  async getAllProductCategory(page: number, limit: number) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;
    const [productCategories, totalCount] = await this.prisma.$transaction([
      this.prisma.productCategory.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normalLimit,
      }),
      this.prisma.productCategory.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      data: productCategories,
      meta: {
        "Current Page": page,
        "Items per Page": normalLimit,
        "Total Pages": Math.ceil(totalCount / limit),
        "Total Items": totalCount,
      },
    };
  }

  async getProductCategoryById(product_category_id: number): Promise<ProductCategory> {
    const category = await this.prisma.productCategory.findFirst({
      where:{
        product_category_id: product_category_id,
        deleted_at: null
      },
      include: {
        product: true,
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
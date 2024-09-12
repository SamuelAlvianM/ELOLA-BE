/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';
import { ProductCategory } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async createNewCategory(data: CreateProductCategoryDto, store_id: number) {
    return this.prisma.productCategory.create({
      data: {
        ...data,
        store: {
          connect: {store_id: store_id},
        },
      },

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
        currentPage: page,
        itemsPerPage: normalLimit,
        totalPages: Math.ceil(totalCount / normalLimit ),
        totalItems: totalCount,
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


  async updateCategory(product_category_id: number, update_dto: UpdateProductCategoryDto) {
    return this.prisma.productCategory.update({
      where: { product_category_id: product_category_id },
      data: {
        category_name: update_dto.category_name,
      },
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
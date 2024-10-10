/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Product_Category_Dto, Update_Product_Category_Dto } from './dto/productCategory.dto';
import { product_category } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async create_new_data(create_data: Create_Product_Category_Dto, outlet_id: string) {
    return this.prisma.product_category.create({
      data: {
        ...create_data,
        outlet: {
          connect: {outlet_id},
        },
      },

    });
  }

  async get_all_product_categories(page: number, limit: number, filter?: string, sortField?: string, sort_order?: 'asc' | 'desc') {
    const max_limit = 10;
    const normal_limit = Math.min(limit, max_limit)
    const skip = (page - 1) * normal_limit;

    const condition: any = {
      deleted_at: null,
    };

    if (filter) {
      condition.category_name = {
        contains: filter,
        mode: 'insensitive',
      };
    }

    const sort: any = {};
    if (sortField) {
      sort[sortField] = sort_order || 'asc';
    } else {
      sort['created_at'] = 'asc'; 
    }
    
    const [product_categories, total] = await this.prisma.$transaction([
      this.prisma.product_category.findMany({
        where: condition,
        skip: skip,
        take: normal_limit,
        orderBy: sort,
        include: {
          product: true,
        },
      }),
      this.prisma.product_category.count({
        where: condition,
      }),
    ]);

    return {
      data: product_categories,
      meta: {
        current_page: page,
        items_per_page: normal_limit,
        total_pages: Math.ceil(total / normal_limit ),
        total_items: total,
      },
    };
  }

  async get_one_product_category(product_category_id: number): Promise<product_category> {
    const category = await this.prisma.product_category.findFirst({
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


  async update_product_category(product_category_id: number, update_dto: Update_Product_Category_Dto) {
    return this.prisma.product_category.update({
      where: { product_category_id: product_category_id },
      data: {
        category_name: update_dto.category_name,
      },
    });
  }

  async soft_delete_product_category(product_category_id: number){
    const check_data = await this.prisma.product_category.findUnique({where: {product_category_id}});

    if(!check_data || check_data.is_deleted) {
      throw new NotFoundException(`Product_Category ${product_category_id} not found`)
    }

    return this.prisma.product_category.update({
      where: { product_category_id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  async permanent_delete_product_category(product_category_id: number): Promise<void> {
    const check_available_data = await this.prisma.product_category.findUnique({where: {product_category_id}});

    if(!check_available_data || check_available_data.is_deleted) {
      throw new NotFoundException(`Product_Category ${product_category_id} not found`);
    }

    await this.prisma.product_category.delete({
      where: { product_category_id},
    });
  }
}
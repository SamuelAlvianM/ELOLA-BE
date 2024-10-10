/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Product_Dto } from './dto/product.dto';
import { Update_Product_Dto } from './dto/update-product.dto';
import { product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,) {}

  async get_product_taxes_promos( product_id: string) {
    const product = await this.prisma.product.findUnique({
      where: { product_id: product_id },
      include: {
        product_taxes: {
          include: {
            tax: true,
          },
        },
        product_promos: {
          include: {
            promo: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    const is_promo_included = product.product_promos.length > 0;
    const is_tax_included = product.product_taxes.length > 0;
  
    return {
      product,
      alerts: {
        promo_included: is_promo_included ? 'This product is under a promo' : 'No active promo for this product',
        tax_included: is_tax_included ? 'This product has tax applied' : 'No tax applied to this product',
      },
    };
  }

  async add_tax_product(product_id: string, tax_id: string) {
    return this.prisma.product_tax.create({
      data: {
        product_id: (product_id),
        tax_id: parseInt(tax_id)
      },
    });
  }

  async remove_tax_product(product_id: string, tax_id: number) {
    return this.prisma.product_tax.delete({
      where: {
        product_id_tax_id:{
          product_id: product_id,
          tax_id: tax_id,
        },
      },
    });
  }

  async create_new_product(create_data: Create_Product_Dto) {
    return this.prisma.product.create({
      data: create_data,
    })
  }

  async get_product_by_page(
    page: number, 
    limit: number, 
    filters: {
      category?: string;
      product_name: string;
    },
    sorted_field?: string, 
    sort_order?: 'asc' | 'desc',
  ) {
    const max_limit = 10;
    const normal_limit = Math.min(limit, max_limit)
    const skip = (page - 1) * normal_limit;

    const condition: any = {
      deleted_at: null,
    };

    if(filters.category) {
      condition.product_category = {
        category_name: {
          contains: filters.category,
          mode: 'insensitive',  
        },
      };
    }

    if(filters.product_name) {
      condition.product_name = {
        contains: filters.product_name,
        mode: 'insensitive',
      };
    }

    const sort: any = {};
    if (sorted_field) {
      sort[sorted_field] = sort_order || 'asc';
    } else {
      sort['created_at'] = 'asc'; 
    }

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: condition,
        skip: skip,
        take: normal_limit,
        orderBy: {
          [sorted_field]: sort_order,
        },
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
        current_page: page,
        items_per_page: normal_limit,
        total_pages: Math.ceil(total / normal_limit),
        total_items: total,
      },
    };
  }
  
  async find_all_products() {
    return this.prisma.product.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        product_category:{
          select: {
            category_name: true,
          },
        },
      },
    });
  }

  async find_one_product(product_id: string) {
    return this.prisma.product.findUnique({
      where: { 
        product_id,
        deleted_at: null, 
      },
    });
  }

  async update_product(product_id: string, data: Update_Product_Dto) {
    return this.prisma.product.update({
      where: {product_id},
      data,
    })
  }
  async soft_delete_product(product_id: string): Promise<product> {

    const check_product_data = await this.prisma.product.findUnique({where: {product_id}});

    if(!check_product_data || check_product_data.is_deleted) {
      throw new NotFoundException(`Product ${product_id} not found`);
    }

    return this.prisma.product.update({
      where: { product_id },
      data: { 
        is_deleted: true,
        deleted_at: new Date()
      },
    });
  }

  async permanent_delete_product(product_id: string): Promise<void> {
    const check_product_data = await this.prisma.product.findUnique({where: {product_id}});

    if(!check_product_data || check_product_data.is_deleted) {
      throw new NotFoundException(`Product ${product_id} not found`);
    }

    await this.prisma.product.delete({where: {product_id}});
  }
}
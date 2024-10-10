/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Apply_Promo_Dto, Create_Promo_Dto, Update_Promo_Dto } from './dto/promo.dto';
import { promo } from '@prisma/client';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}


  async create_new_promo(promo_data: Create_Promo_Dto) {
    const { promo_name, promo_type, promo_value, product_id, start_date, end_date } = promo_data;

    if (end_date && start_date && end_date < start_date) {
      throw new BadRequestException("End date cannot be before the start date.");
    }
    
    const promo = await this.prisma.promo.create({
      data: {
        promo_name,
        promo_type,
        promo_value,
        product_id: product_id || null, 
        start_date: start_date || new Date(),
        end_date: end_date || new Date(),
      },
    });

    return promo;
  }

  async get_all_promos(page: number, limit: number) {
    const max_limit = 10;
    const normal_limit = Math.min(limit, max_limit)
    const skip = (page - 1) * normal_limit;
    const [promos, total] = await this.prisma.$transaction([
      this.prisma.promo.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normal_limit,
      }),
      this.prisma.promo.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      data: promos,
      meta: {
        current_page: page,
        items_per_page: normal_limit,
        total_pages: Math.ceil(total / normal_limit ),
        total_items: total,
      },
    };
  }

  async get_one_promo(promo_id: number): Promise<promo> {
    const promo = await this.prisma.promo.findFirst({
      where: {
        promo_id,
        deleted_at: null,
      },
    });

    if (!promo) {
      throw new NotFoundException(`Payment with ID ${promo_id} not found or has been deleted.`);
    }

    return promo;
  }

  async update_promo_data(promo_id: number, update_data: Update_Promo_Dto): Promise<promo> {
    const update_data_promo = await this.prisma.promo.findUnique({where: {promo_id}});

    if(!update_data_promo) {
        throw new NotFoundException(`data for ${promo_id} not found`);
    }

    return this.prisma.promo.update({
      where: { promo_id },
      data: update_data,
    });
  }

  async soft_delete_promo(promo_id: number): Promise<promo> {
    return this.prisma.promo.update({
      where: { promo_id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      }
    });
  }

  async permanent_delete_promo(promo_id: number): Promise<void> {
    const delete_data = await this.get_one_promo(promo_id);
    if(!delete_data) {
        throw new NotFoundException(`Promo ${promo_id} not found`);
    }

    await this.prisma.promo.delete({
        where: { promo_id },
    });
  }

  async applypromoGlobal(promo_id: number) {
    const promo_global = await this.prisma.promo.findUnique({
      where: { promo_id },
    });

    if(!promo_global) {
      throw new NotFoundException('promo not found');
    }

    const products = await this.prisma.product.findMany ({
      where: { deleted_at: null },
    });

    for (const product of products) {
      let new_price;
      if (promo_global.promo_type === 'discount') {
        new_price = product.product_price - (product.product_price * promo_global.promo_value) / 100;
      } else {
        new_price = product.product_price - promo_global.promo_value;
      }

      await this.prisma.product.update({
        where: { product_id: product.product_id },
        data: { product_price: new_price },
      });

      await this.prisma.product_promo.upsert({
        where: {
          product_id_promo_id: {
            product_id: product.product_id,
            promo_id: promo_global.promo_id,
          },
        },
        update: {},
        create: {
          product_id: product.product_id,
          promo_id: promo_global.promo_id,
        },
      });
    }

    return { message: 'promo applied to all products successfully' };
}

  async applypromo(applyPromoDto: Apply_Promo_Dto) {
    const { product_id, promo_id } = applyPromoDto;

    const promo = await this.prisma.promo.findUnique({ where: { promo_id } });
    if (!promo) throw new Error('Promo not found');

    const product = await this.prisma.product.findUnique({ where: { product_id } });
    if (!product) throw new Error('Product not found');

    let newPrice;
    if (promo.promo_type === 'discount') {
      newPrice = product.product_price - (product.product_price * promo.promo_value) / 100;
    } else {
      newPrice = product.product_price - promo.promo_value;
    }

    const discounted_price = await this.prisma.product.update({
      where: { product_id: product_id },
      data: { product_price: newPrice },
    });

    await this.prisma.product.update({
      where: { product_id: product_id },
      data: { product_price: newPrice },
    });

    await this.prisma.product_promo.upsert({
      where: {
        product_id_promo_id: {
          product_id: product_id,
          promo_id: promo_id,
        },
      },
      update: {},
      create: {
        product_id: product_id,
        promo_id: promo_id,
      },
    });


    return this.prisma.product.findUnique({
      where: { product_id: product_id },
      include: {
        product_promos: {
          include: {
            promo: true,
          },
        },
      },
    });
  }
}
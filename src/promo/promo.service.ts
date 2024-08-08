/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyPromoDto, CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { Promo } from '@prisma/client';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}

  async createPromo(createPromoDto: CreatePromoDto) {
    return this.prisma.promo.create({
      data: createPromoDto,
    });
  }

  async applyPromoProduct (product_id: number) {
    const promo = await this.prisma.promo.findFirst({
      where: {
        product_id,
        start_date: {
          lte: new Date()
        },
        end_date: {
          gte: new Date()
        },
      },
      orderBy: {
        end_date: 'asc'
      },
    });

    if (!promo) {
      return null;
    }

  }

  async getAllPromos(): Promise<Promo[]>{
    return this.prisma.promo.findMany({
      where: {
        deleted_at: null
      },
    })
  }
  
  async getPromoById(promo_id: number): Promise<Promo> {
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

  async updatePromo(promo_id: number, data: UpdatePromoDto) {
    return this.prisma.promo.update({
      where: { promo_id },
      data,
    });
  }

  // misal dia mau nambah promo, harga product awal - promo = harga promo berlangsung 
  // misal dia mau ubah value, nanti di update nya masukin algo buat brubah nominal harga

  async softDeletePromo(promo_id: number): Promise<Promo> {
    return this.prisma.promo.update({
      where: {
        promo_id
      },
      data: {
        deleted_at: new Date()
      }
    });
  }

  // async applyPromoToProduct(product_id: number) {
  //   // Ensure productId is a valid integer
  // if (typeof product_id !== 'number' || isNaN(product_id) || product_id <= 0) {
  //   throw new BadRequestException('Invalid product ID');
  // }
  //   // Fetch the product
  //   const product = await this.prisma.product.findUnique({
  //     where: { product_id: product_id },
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   // Fetch the active promo for the product
  //   const promo = await this.prisma.promo.findFirst({
  //     where: {
  //       product_id: product_id,
  //       deleted_at: null,
  //       start_date: { lte: new Date() },
  //       end_date: { gte: new Date() },
  //     },
  //   });

  //   let discountedPrice = product.product_price;

  //   if (promo) {
  //     switch (promo.promo_type) {
  //       case 'Discount':
  //         discountedPrice = product.product_price * (1 - promo.promo_value / 100); // Percentage Discount
  //         break;
  //       case 'Sales':
  //         discountedPrice = product.product_price - promo.promo_value;
  //         break;
  //       default:
  //         throw new Error('Invalid Promo Type');
  //     }
  //   }

  //   discountedPrice = Math.max(discountedPrice, 0)

  //   return {
  //     product,
  //     promo,
  //     discountedPrice: discountedPrice > 0 ? discountedPrice : 0, // Ensure non-negative price
  //   };
  // }

  async applyPromo(applyPromoDto: ApplyPromoDto) {
    const { product_id, promo_id } = applyPromoDto;

    const promo = await this.prisma.promo.findUnique({ where: { promo_id } });
    if (!promo) throw new Error('Promo not found');

    const product = await this.prisma.product.findUnique({ where: { product_id } });
    if (!product) throw new Error('Product not found');

    let newPrice;
    if (promo.promo_type === 'Discount') {
      newPrice = product.product_price - (product.product_price * promo.promo_value) / 100;
    } else {
      newPrice = product.product_price - promo.promo_value;
    }

    return this.prisma.product.update({
      where: { product_id },
      data: { product_price: newPrice },
    });
  }
}

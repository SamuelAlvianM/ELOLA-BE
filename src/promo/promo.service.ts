/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyPromoDto, CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { Promo } from '@prisma/client';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}


  async createPromo(createPromoDto: CreatePromoDto) {
    const { promo_name, promo_type, promo_value, product_id, start_date, end_date } = createPromoDto;

    if (end_date && start_date && end_date < start_date) {
      throw new BadRequestException("End date cannot be before the start date.");
    }
    
    const promo = await this.prisma.promo.create({
      data: {
        promo_name,
        promo_type,
        promo_value,
        product_id: product_id || null, // Allow null if product_id is not provided
        start_date: start_date || new Date(),
        end_date: end_date || new Date(),
      },
    });

    return promo;
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
        promo_id: promo_id
      },
      data: {
        deleted_at: new Date()
      }
    });
  }

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

    const discounted_price = await this.prisma.product.update({
      where: { product_id: product_id },
      data: { product_price: newPrice },
    });

    await this.prisma.productPromo.upsert({
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
  
    // return this.prisma.product.update({
    //   where: { product_id },
    //   data: { product_price: newPrice },
    // });

    return this.prisma.product.findUnique({
      where: { product_id: product_id },
      include: {
        ProductPromo: {
          include: {
            promo: true,
          },
        },
      },
    });
  }


  // async getProductWithPromo(productId: number) {
  //   // Fetch the product along with its associated promos
  //   const product = await this.prisma.product.findUnique({
  //     where: { product_id: productId },
  //     include: {
  //       ProductPromo: {
  //         include: {
  //           promo: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   // Calculate the final price after applying promo
  //   const promoAppliedProduct = {
  //     ...product,
  //     finalPrice: this.applyPromosToProduct(product),
  //   };

  //   return promoAppliedProduct;
  // }

  // private applyPromosToProduct(product: any) {
  //   let finalPrice = product.product_price;

  //   product.ProductPromo.forEach(({ promo }) => {
  //     if (promo.promo_type === 'Discount') {
  //       finalPrice -= (finalPrice * promo.promo_value) / 100;
  //     } else if (promo.promo_type === 'Sales') {
  //       finalPrice -= promo.promo_value;
  //     }
  //   });

  //   return finalPrice;
  // }
}
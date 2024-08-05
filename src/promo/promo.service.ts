/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { Promo } from '@prisma/client';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}

  async createPromo(data: CreatePromoDto) {
    return this.prisma.promo.create({
      data,
    });
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
}

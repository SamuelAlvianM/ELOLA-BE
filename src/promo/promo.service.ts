/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}

  async createPromo(data: CreatePromoDto) {
    return this.prisma.promo.create({
      data,
    });
  }

  async getAllPromos() {
    return this.prisma.promo.findMany();
  }

  async getPromoById(promo_id: number) {
    return this.prisma.promo.findUnique({
      where: { promo_id },
    });
  }

  async updatePromo(promo_id: number, data: UpdatePromoDto) {
    return this.prisma.promo.update({
      where: { promo_id },
      data,
    });
  }

  async deletePromo(promo_id: number) {
    return this.prisma.promo.delete({
      where: { promo_id },
    });
  }
}

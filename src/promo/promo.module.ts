/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PromoController],
  providers: [PromoService, PrismaService],
  exports: [PromoService]
})
export class PromoModule {}
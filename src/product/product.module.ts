/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
// import { PromoModule } from 'src/promo/promo.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  // imports: [PromoModule, ProductModule]
})
export class ProductModule {}

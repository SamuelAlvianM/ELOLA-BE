/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategoryController } from './productCategory.controller';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService],
})
export class ProductCategoryModule {}

import { IsInt, IsOptional, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Tax } from '@prisma/client';

export class CreateItemDto {
  @IsInt()
  product_id: number;

  @IsInt()
  quantity: number;

  @IsInt()
  sub_total: number;

  @IsInt()
  tax_id: number;
}

export class UpdateItemDto {
  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsInt()
  tax_id?: number;
}
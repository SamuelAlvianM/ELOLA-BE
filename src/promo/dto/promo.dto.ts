/* eslint-disable prettier/prettier */
import { Promo_type } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsDate, IsNotEmpty } from 'class-validator';

export class CreatePromoDto {
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsEnum(Promo_type)
  promo_type: Promo_type;

  @IsInt()
  promo_value: number;

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;
}

export class UpdatePromoDto {
  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsEnum(Promo_type)
  promo_type?: Promo_type;

  @IsOptional()
  @IsInt()
  promo_value?: number;

  @IsOptional()
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @IsDate()
  end_date?: Date;
}
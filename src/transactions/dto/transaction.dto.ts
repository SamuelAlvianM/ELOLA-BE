import { IsInt, IsNumber, IsString, IsEnum, isString } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';
import { IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  store_id: number;

  @IsInt()
  user_id: number;

  @IsEnum(Order_type)
  order_type: Order_type;

  @IsString()
  driver_partner: string;

  @IsString()
  product_name: string;

  @IsString()
  tax_name: string;

  @IsNumber()
  sub_total: number;

  @IsNumber()
  service: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  discount: number;

  @IsInt()
  rounding: number;

  @IsInt()
  grand_total: number;

  @IsNumber()
  c_o_g_s: number;

  @IsEnum(Order_payment_type)
  payment_type: Order_payment_type;

  @IsInt()
  change: number;
}

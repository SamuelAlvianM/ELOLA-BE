import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  store_id: number;

  @IsNotEmpty()
  @IsEnum(Order_type)
  order_type: Order_type;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(Order_payment_type)
  payment_type: Order_payment_type;

  @IsOptional()
  @IsString()
  receipt_number?: string;

  @IsNotEmpty()
  @IsNumber()
  sub_total: number;

  @IsNotEmpty()
  @IsNumber()
  tax_id: number;

  @IsNotEmpty()
  @IsNumber()
  grand_total: number;

  @IsOptional()
  @IsString()
  customer_name?: string;

  @IsOptional()
  @IsString()
  whatsapp_number?: string;

  @IsOptional()
  @IsNumber()
  change?: number;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsEnum(Order_type)
  order_type?: Order_type;

  @IsOptional()
  @IsNumber()
  product_id?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsEnum(Order_payment_type)
  payment_type?: Order_payment_type;

  @IsOptional()
  @IsString()
  receipt_number?: string;

  @IsOptional()
  @IsNumber()
  sub_total?: number;

  @IsOptional()
  @IsNumber()
  tax_id?: number;

  @IsOptional()
  @IsNumber()
  grand_total?: number;

  @IsOptional()
  @IsString()
  customer_name?: string;

  @IsOptional()
  @IsString()
  whatsapp_number?: string;

  @IsOptional()
  @IsNumber()
  change?: number;
}

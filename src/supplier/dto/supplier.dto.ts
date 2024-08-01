import { IsInt, IsNumber, IsString, IsEnum } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';

export class CreateSupplierDto {
  @IsInt()
  supplier_id: number;

  @IsString()
  supplier_name: string;

  @IsString()
  supplier_product: string;

  @IsString()
  phone_number: number;

  @IsString()
  email: string;
}

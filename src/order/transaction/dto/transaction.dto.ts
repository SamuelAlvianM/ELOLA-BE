import { IsInt, IsString, IsEnum, IsOptional, IsNumberString, IsNotEmpty } from 'class-validator';
import { Order_payment_type } from '@prisma/client';

export class CreateTransactionDto {

  @IsEnum(Order_payment_type)
  @IsNotEmpty()
  payment_type: Order_payment_type;

  @IsNotEmpty()
  @IsNumberString()
  amount_paid?: bigint;

}

export class UpdateTransactionDto {

  @IsOptional()
  @IsEnum(Order_payment_type)
  payment_type?: Order_payment_type;

  @IsOptional()
  @IsNumberString()
  amount_paid?: bigint;

}
import { IsInt, IsNumber, IsString, IsEnum, isString } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';
import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @IsInt()
  @ApiProperty({example: 1})
  store_id: number;

  @IsInt()
  @ApiProperty({example: 1})
  user_id: number;

  @IsEnum(Order_type)
  @ApiProperty({example: "Retail / Take Away"})
  order_type: Order_type;

  @IsString()
  @ApiProperty({example: "Gojek"})
  driver_partner: string;

  @IsString()
  @ApiProperty({example: "V-60"})
  product_name: string;

  @IsString()
  @ApiProperty({example: "PPN"})
  tax_name: string;

  @IsNumber()
  @ApiProperty({example: 10000})
  sub_total: number;

  @IsNumber()
  @ApiProperty({example: 20})
  service: number;

  @IsNumber()
  @ApiProperty({example: 20})
  tax: number;

  @IsNumber()
  @ApiProperty({example: 10})
  discount: number;

  @IsInt()
  @ApiProperty({example: 14000})
  rounding: number;

  @IsInt()
  @ApiProperty({example: 14000})
  grand_total: number;

  @IsNumber()
  @ApiProperty({example: 6000})
  c_o_g_s: number;

  @IsEnum(Order_payment_type)
  @ApiProperty({example: "Cash / Bank / Transfer"})
  payment_type: Order_payment_type;

  @IsInt()
  @ApiProperty({example: 0})
  change: number;
}

import { IsInt, IsNumber, IsString, IsEnum } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @IsInt()
  @ApiProperty({example: 1})
  supplier_id: number;

  @IsString()
  @ApiProperty({example: "Diamond"})
  supplier_name: string;

  @IsString()
  @ApiProperty({example: "Susu segar @1_Liter"})
  supplier_product: string;

  @IsInt()
  @ApiProperty({example: +628705454545})
  phone_number: number;

  @IsString()
  @ApiProperty({example: "email@gmail.com"})
  email: string;
}

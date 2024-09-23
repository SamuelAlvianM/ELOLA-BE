import { IsInt, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { order_type, order_payment_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateSupplierDto {

  @IsString()
  @ApiProperty({example: "Greenfield"})
  @Expose()
  supplier_name: string;

  @IsString()
  @ApiProperty({example: "Susu oat"})
  @Expose()
  supplier_product: string;

  @IsString()
  @ApiProperty({example: "08775582546"})
  @Expose()
  phone_number: string;

  @IsString()
  @ApiProperty({example: "greenfields@gmail.com"})
  @Expose()
  email: string;
}

export class UpdateSupplierDto {

  @IsString()
  @ApiProperty({example: "Diamond"})
  @IsOptional()
  @Expose()
  supplier_name: string;

  @IsString()
  @ApiProperty({example: "Susu segar @1_Liter"})
  @IsOptional()
  @Expose()
  supplier_product: string;

  @IsString()
  @ApiProperty({example: "08705454545"})
  @IsOptional()
  @Expose()
  phone_number: string;

  @IsString()
  @ApiProperty({example: "email@gmail.com"})
  @IsOptional()
  @Expose()
  email: string;
}

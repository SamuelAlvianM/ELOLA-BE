import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;
}

export class CreateTransactionDto {
  
  @IsNotEmpty()
  @IsEnum(Order_type)
  @ApiProperty({example: 'TakeAway | Order'})
  order_type: Order_type;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example: 2})
  total_quantity: number;

  @IsNotEmpty()
  @IsEnum(Order_payment_type)
  @ApiProperty({example: 'Cash | Transfer | E_Payment'})
  payment_type: Order_payment_type;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example: 10000})
  sub_total: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example: 20000})
  grand_total: number;

  @IsOptional()
  @IsString()
  @ApiProperty({example: 'sam'})
  customer_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({example: '08770504123'})
  whatsapp_number?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 0})
  change?: number;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsEnum(Order_type)
  @ApiProperty({example: 'TakeAway | Order'})
  order_type?: Order_type;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 2})
  product_id?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 2})
  total_quantity?: number;

  @IsOptional()
  @IsEnum(Order_payment_type)
  @ApiProperty({example: 'Cash | Transfer | E_Payment'})
  payment_type?: Order_payment_type;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 10000})
  sub_total?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 20000})
  grand_total?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({example: 'sam'})
  customer_name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({example: '08770504123'})
  whatsapp_number?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({example: 0})
  change?: number;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Order_type, Order_payment_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductDto {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'ID dari produk yang akan dibeli',
    type: Number,
  })
  product_id: number;

  @IsNumber()
  @ApiProperty({
    example: 2,
    description: 'Jumlah produk yang dipesan',
    type: Number,
  })
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
  @ApiProperty({
    description: 'Daftar produk yang dipesan dengan ID dan kuantitasnya',
    type: [ProductDto],
    example: [
      {
        product_id: 1,
        quantity: 2,
      },
      {
        product_id: 2,
        quantity: 1,
      },
    ],
  })
  products: ProductDto[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({example: 2})
  quantity: number;

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
  product?: number;

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

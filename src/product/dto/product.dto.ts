/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max } from 'class-validator';


export class CreateProductDto {
  @IsInt()
  @ApiProperty({example: 1})
  store_id: number;

  @IsInt()
  @ApiProperty({example: 1})
  product_category_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: "V-60"})
  product_name: string;

  @IsInt()
  @ApiProperty({example: 50000})
  product_price: number;

  @IsInt()
  @ApiProperty({example: 20})
  cost_of_good_sold: number;

  @IsInt()
  @ApiProperty({example: 80})
  @Max(555)
  product_code: number;

  @IsOptional()
  @IsString()
  @ApiProperty({example: "OVO"})
  product_image?: string;
}
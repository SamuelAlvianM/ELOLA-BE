import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  store_id: number;

  @IsInt()
  product_category_id: number;

  @IsString()
  product_name: string;

  @IsInt()
  product_price: number;

  @IsInt()
  cost_of_good_sold: number;

  @IsInt()
  product_code: number;

  @IsOptional()
  @IsString()
  product_image?: string;
}

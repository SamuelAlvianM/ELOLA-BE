/* eslint-disable prettier/prettier */
import { IsInt, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  product_id: number;

  @IsInt()
  store_id: number;

  @IsString()
  inventory_name: string;

  @IsInt()
  value_stored: number;

  @IsInt()
  value_out: number;
}

export class UpdateInventoryDto {
  @IsInt()
  product_id: number;

  @IsInt()
  store_id: number;

  @IsString()
  inventory_name: string;
  
  @IsInt()
  value_stored: number;

  @IsInt()
  value_out: number;
}

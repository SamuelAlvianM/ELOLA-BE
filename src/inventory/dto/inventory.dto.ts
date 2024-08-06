/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { IsNotEmpty, IsInt, IsString, IsOptional, IsDate } from 'class-validator';
// import { Type } from 'class-transformer';

// export class CreateInventoryDto {
//   @IsInt()
//   @IsNotEmpty()
//   product_id: number;

//   @IsInt()
//   @IsNotEmpty()
//   store_id: number;

//   @IsString()
//   @IsNotEmpty()
//   inventory_name: string;

//   @IsInt()
//   @IsNotEmpty()
//   value_stored: number;

//   @IsInt()
//   @IsNotEmpty()
//   value_out: number;

//   @IsOptional()
//   @IsDate()
//   @Type(() => Date)
//   in_storage_date?: Date;
  
//   @IsOptional()
//   @IsDate()
//   out_storage_date?: Date;
// }

// export class UpdateInventoryDto {
//   @IsOptional()
//   @IsInt()
//   product_id?: number;

//   @IsOptional()
//   @IsInt()
//   store_id?: number;

//   @IsOptional()
//   @IsString()
//   inventory_name?: string;

//   @IsOptional()
//   @IsInt()
//   value_stored?: number;

//   @IsOptional()
//   @IsInt()
//   value_out?: number;

//   @IsOptional()
//   @IsDate()
//   @Type(() => Date)
//   in_storage_date?: Date;

//   @IsOptional()
//   @IsDate()
//   out_storage_date?: Date;
// }

import { IsInt, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  product_id: number;

  @IsInt()
  store_id: number;

  @IsString()
  inventory_name: string;

  // @IsDate()
  // @IsOptional()
  // in_storage_date?: Date;

  @IsInt()
  value_stored: number;

  // @IsDate()
  // @IsOptional()
  // out_storage_date?: Date;

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

  // @IsDate()
  // @IsOptional()
  // in_storage_date?: Date;

  @IsInt()
  value_stored: number;

  // @IsDate()
  // @IsOptional()
  // out_storage_date?: Date;

  @IsInt()
  value_out: number;
}

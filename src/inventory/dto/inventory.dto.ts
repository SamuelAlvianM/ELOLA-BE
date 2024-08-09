/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  @ApiProperty({example: 1})
  @Expose()
  product_id: number;

  @IsInt()
  @ApiProperty({example: 1})
  @Expose()
  store_id: number;

  @IsString()
  @ApiProperty({example: 'pizza ingredients'})
  @Expose()
  inventory_name: string;

  @IsInt()
  @ApiProperty({example: 200})
  @Expose()
  value_stored: number;

  @IsInt()
  @ApiProperty({example: 100})
  @IsOptional()
  @Expose()
  value_out: number;
}

export class UpdateInventoryDto {
  @IsInt()
  @ApiProperty({example: 1})
  @Expose()
  product_id: number;

  @IsInt()
  @ApiProperty({example: 1})
  @Expose()
  store_id: number;

  @IsString()
  @ApiProperty({example: 'pizza ingredients'})
  @Expose()
  inventory_name: string;

  @IsInt()
  @ApiProperty({example: 100})
  @Expose()
  value_stored: number;

  @IsInt()
  @ApiProperty({example: 100})
  @Expose()
  value_out: number;
}

/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  @ApiProperty({example: 1})
  product_id: number;

  @IsInt()
  @ApiProperty({example: 1})
  store_id: number;

  @IsString()
  @ApiProperty({example: 'pizza ingredients'})
  inventory_name: string;

  @IsInt()
  @ApiProperty({example: 200})
  value_stored: number;

  @IsInt()
  @ApiProperty({example: 100})
  value_out: number;
}

export class UpdateInventoryDto {
  @IsInt()
  @ApiProperty({example: 1})
  product_id: number;

  @IsInt()
  @ApiProperty({example: 1})
  store_id: number;

  @IsString()
  @ApiProperty({example: 'pizza ingredients'})
  inventory_name: string;

  @IsInt()
  @ApiProperty({example: 100})
  value_stored: number;

  @IsInt()
  @ApiProperty({example: 100})
  value_out: number;
}

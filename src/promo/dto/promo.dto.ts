/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { promo_type } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsDate, IsNotEmpty, IsString, MinDate } from 'class-validator';

export class Create_Promo_Dto {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({example: 1})
  product_id?: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: "Promo 1"})
  promo_name: string;

  @IsEnum(promo_type)
  @ApiProperty({example: "Discount / Sales"})
  promo_type: promo_type;

  @IsInt()
  @ApiProperty({example: 20, description: "Prothis will be added as percentage"})
  promo_value: number;

  @IsDate()
  @IsOptional()
  @ApiProperty({example: "2022-01-01T00:00:00.000Z", description: "will be using calendar system in frontend"})
  @MinDate(new Date(), { message: "Start date cannot be before today." })
  @Type(() => Date)
  start_date?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({example: "2022-01-01T00:00:00.000Z", description: "will be using calendar system in frontend"})
  @Type(() => Date)
  end_date?: Date;
}

export class Update_Promo_Dto {
  @IsOptional()
  @IsInt()
  @ApiProperty({example: 1})
  product_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({example: "Promo 2"})
  promo_name?: string;

  @IsOptional()
  @IsEnum(promo_type)
  @ApiProperty({example: "Discount"})
  promo_type?: promo_type;

  @IsOptional()
  @IsInt()
  @ApiProperty({example: 20, description: "will be added as percentage / number"})
  promo_value?: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({example: "2022-01-01T00:00:00.000Z", description: "will be using calendar system in frontend"})
  @MinDate(new Date(), { message: "Start date cannot be before today." })
  @Type(() => Date)
  start_date?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({example: "2022-01-01T00:00:00.000Z", description: "will be using calendar system in frontend"})
  @Type(() => Date)
  end_date?: Date;
}

export class Apply_Promo_Dto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({example: 1})
  product_id: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({example: 1})
  promo_id: number;
}

export class Unapply_Promo_Dto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  product_id: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  promo_id: number;
}
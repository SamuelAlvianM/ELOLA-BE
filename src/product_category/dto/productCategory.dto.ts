/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductCategoryDto {


    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    @Expose()
    store_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Main Course - Savory"})
    @Expose()
    category_name: string;
}

export class UpdateProductCategoryDto {

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 1})
    @Expose()
    store_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({example: "Apetizer - Savory"})
    @Expose()
    category_name?: string;
}
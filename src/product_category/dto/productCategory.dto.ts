/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductCategoryDto {


    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    store_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Main Course - Savory"})
    category_name: string;
}

export class UpdateProductCategoryDto {

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 1})
    store_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({example: "Apetizer - Savory"})
    category_name?: string;
}
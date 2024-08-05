/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductCategoryDto {
    // @IsInt()
    // @IsNotEmpty()
    // product_category_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;

    @IsString()
    @IsNotEmpty()
    category_name: string;
}

export class UpdateProductCategoryDto {
    // @IsInt()
    // @IsNotEmpty()
    // product_category_id: number;

    @IsInt()
    @IsOptional()
    store_id?: number;

    @IsString()
    @IsOptional()
    category_name?: string;
}
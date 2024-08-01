/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProductCategoryDto {
    // @IsInt()
    // @IsNotEmpty()
    // product_category_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;

    @IsString()
    category_name: string;
}

export class UpdateProductCategoryDto {
    // @IsInt()
    // @IsNotEmpty()
    // product_category_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;

    @IsString()
    category_name: string;
}
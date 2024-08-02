/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt, IsString } from "class-validator";

export class CreateInventoryDto {
    @IsInt()
    @IsNotEmpty()
    product_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;

    @IsString()
    inventory_name: string;

    @IsInt()
    @IsNotEmpty()
    value_stored: number;

    @IsInt()
    @IsNotEmpty()
    value_out: number;
}

export class UpdateInventoryDto {
    @IsInt()
    @IsNotEmpty()
    inventory_id: number;

    @IsInt()
    @IsNotEmpty()
    value_stored: number;

    @IsInt()
    @IsNotEmpty()
    value_out: number;
}
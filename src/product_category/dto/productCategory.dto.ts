/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class Create_Product_Category_Dto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Main Course - Savory"})
    @Expose()
    category_name: string;
}

export class Update_Product_Category_Dto {

    @IsString()
    @IsOptional()
    @ApiProperty({example: "Apetizer - Savory"})
    @Expose()
    category_name: string;
}
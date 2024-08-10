/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { Payment_type } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreatePayment {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    @Expose()
    store_id: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "BCA"})
    @Expose()
    payment_name: string;

    @IsEnum(Payment_type)
    @ApiProperty({example: "Bank"})
    @Expose()
    payment_type: Payment_type;
}

export class UpdatePayment {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({example: 1})
    @Expose()
    store_id?: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "OVO"})
    @Expose()
    payment_name: string;

    @IsEnum(Payment_type)
    @ApiProperty({example: "E-Payment"})
    @Expose()
    payment_type: Payment_type;
}
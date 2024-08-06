/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { Payment_type } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePayment {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    store_id: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "BCA"})
    payment_name: string;

    @IsEnum(Payment_type)
    @ApiProperty({example: "Bank"})
    payment_type: Payment_type;
}

export class UpdatePayment {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({example: 1})
    store_id?: number;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "OVO"})
    payment_name: string;

    @IsEnum(Payment_type)
    @ApiProperty({example: "E-Payment"})
    payment_type: Payment_type;
}
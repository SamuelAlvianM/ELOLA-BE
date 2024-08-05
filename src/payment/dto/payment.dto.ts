/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { Payment_type } from "@prisma/client";

export class CreatePayment {
    @IsInt()
    @IsNotEmpty()
    store_id: number;
    
    @IsString()
    @IsNotEmpty()
    payment_name: string;

    @IsEnum(Payment_type)
    payment_type: Payment_type;
}

export class UpdatePayment {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    store_id?: number;
    
    @IsString()
    @IsNotEmpty()
    payment_name: string;

    @IsEnum(Payment_type)
    payment_type: Payment_type;
}
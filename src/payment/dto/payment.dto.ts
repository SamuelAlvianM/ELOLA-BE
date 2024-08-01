/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Payment_type } from "@prisma/client";

export class createPayment {
    // @IsInt()
    // @IsNotEmpty()
    // payment_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;
    
    @IsString()
    payment_name: string;

    @IsEnum(Payment_type)
    payment_type: Payment_type;
}

export class updatePayment {
    // @IsInt()
    // @IsNotEmpty()
    // payment_id: number;

    @IsInt()
    @IsNotEmpty()
    store_id: number;
    
    @IsString()
    payment_name: string;

    @IsEnum(Payment_type)
    payment_type: Payment_type;
}
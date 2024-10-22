/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { payment_type } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class Create_Payment_Dto {
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 1})
    @Expose()
    outlet_id?: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "BCA"})
    @Expose()
    payment_name: string;

    @IsEnum(payment_type)
    @ApiProperty({example: "Bank"})
    @Expose()
    payment_type: payment_type;
}

export class Update_Payment_Dto {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({example: 1})
    @Expose()
    outlet_id?: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "OVO"})
    @Expose()
    payment_name: string;

    @IsEnum(payment_type)
    @ApiProperty({example: "E-Payment"})
    @Expose()
    payment_type: payment_type;
}
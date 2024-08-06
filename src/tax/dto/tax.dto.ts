import { IsNotEmpty, IsString, IsInt, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { TaxController } from '../tax.controller';
import { Tax_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTaxDto {

    @IsNotEmpty()
    @IsEnum(Tax_type)
    @ApiProperty({example: "Service / VAT"})
    tax_type: Tax_type;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Pajak Toko (Service)"})
    tax_name: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    tax_value: number;

    @IsBoolean()
    @ApiProperty({example: true})
    tax_status: boolean;

}

export class UpdateTaxDto {

    @IsOptional()
    @IsEnum(Tax_type)
    @ApiProperty({example: "Service / VAT"})
    tax_type: Tax_type;

    @IsOptional()
    @IsString()
    @ApiProperty({example: "Pajak Toko (Service)"})
    tax_name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    tax_value: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: true})
    tax_status: boolean;

}

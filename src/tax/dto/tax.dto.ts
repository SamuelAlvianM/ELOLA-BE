import { IsNotEmpty, IsString, IsInt, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { TaxController } from '../tax.controller';
import { Tax_type } from '@prisma/client';


export class CreateTaxDto {

    @IsNotEmpty()
    @IsEnum(Tax_type)
    tax_type: Tax_type;

    @IsNotEmpty()
    @IsString()
    tax_name: string;

    @IsInt()
    @IsNotEmpty()
    tax_value: number;

    @IsBoolean()
    tax_status: boolean;

}

export class UpdateTaxDto {

    @IsOptional()
    @IsEnum(Tax_type)
    tax_type: Tax_type;

    @IsOptional()
    @IsString()
    tax_name: string;

    @IsInt()
    @IsOptional()
    tax_value: number;

    @IsBoolean()
    @IsOptional()
    tax_status: boolean;

}

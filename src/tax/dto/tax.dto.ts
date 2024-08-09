import { IsNotEmpty, IsString, IsInt, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { TaxController } from '../tax.controller';
import { Tax_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class CreateTaxDto {

    @IsNotEmpty()
    @IsEnum(Tax_type)
    @ApiProperty({example: "Service / VAT"})
    @Expose()
    tax_type: Tax_type;
    @Expose()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Pajak Toko (Service)"})
    @Expose()
    tax_name: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    @Expose()
    tax_value: number;

    @IsBoolean()
    @ApiProperty({example: true})
    @Expose()
    tax_status: boolean;

}

export class UpdateTaxDto {

    @IsOptional()
    @IsEnum(Tax_type)
    @ApiProperty({example: "Service / VAT"})
    @Expose()
    tax_type: Tax_type;

    @IsOptional()
    @IsString()
    @ApiProperty({example: "Pajak Toko (Service)"})
    @Expose()
    tax_name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    @Expose()
    tax_value: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: true})
    @Expose()
    tax_status: boolean;

}

import { IsNotEmpty, IsString, IsInt, IsOptional, IsEnum, IsBoolean, ValidateIf } from 'class-validator';
import { TaxController } from '../tax.controller';
import { tax_type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class Create_Tax_Dto {

    @IsNotEmpty()
    @IsEnum(tax_type)
    @ApiProperty({example: "Service / VAT"})
    @Expose()
    tax_type: tax_type;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Pajak Toko (Service)"})
    tax_name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    @ValidateIf(type => type.tax_type === "VAT")
    tax_value?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    @ValidateIf(type => type.tax_name === "Service")
    service_value?: number;

    @IsBoolean()
    @ApiProperty({example: true})
    @Expose()
    tax_status?: boolean;

}

export class Update_Tax_Dto {

    @IsOptional()
    @IsEnum(tax_type)
    @ApiProperty({example: "Service / VAT"})
    @Expose()
    tax_type: tax_type;

    @IsOptional()
    @IsString()
    @ApiProperty({example: "Pajak Toko (Service)"})
    @Expose()
    tax_name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    @ValidateIf(type => type.tax_type === "VAT")
    tax_value?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 20, description: "Will be show as percentage in frontend"})
    @ValidateIf(type => type.tax_name === "Service")
    service_value?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: true})
    @Expose()
    tax_status?: boolean;

}

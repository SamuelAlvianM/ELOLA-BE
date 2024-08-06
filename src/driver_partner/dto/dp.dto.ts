import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class Create_DP_Dto {

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({example: 1})
    store_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Gojek'})
    partner_name: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 15})
    benefit: number;
}

export class Update_DP_Dto {
    @IsString()
    @IsOptional()
    @ApiProperty({example: 'Shopee'})
    driver_partner_name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 13})
    benefit: number;
}
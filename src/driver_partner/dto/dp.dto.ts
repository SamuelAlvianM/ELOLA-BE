import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class Create_DP_Dto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Gojek'})
    @Expose()
    partner_name: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({example: 15})
    @Expose()
    benefit: number;
}

export class Update_DP_Dto {
    @IsString()
    @IsOptional()
    @ApiProperty({example: 'Shopee'})
    @Expose()
    partner_name: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({example: 13})
    @Expose()
    benefit: number;
}
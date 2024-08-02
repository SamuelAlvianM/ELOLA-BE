import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class Create_DP_Dto {

    @IsNotEmpty()
    @IsInt()
    store_id: number;

    @IsString()
    @IsNotEmpty()
    partner_name: string;

    @IsInt()
    @IsNotEmpty()
    benefit: number;
}

export class Update_DP_Dto {
    @IsString()
    @IsOptional()
    driver_partner_name: string;

    @IsInt()
    @IsOptional()
    benefit: number;
}
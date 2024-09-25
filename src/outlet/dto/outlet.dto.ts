/* eslint-disable prettier/prettier */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsOptional, IsString, IsInt, IsEmail, IsNumber, MaxLength, IsBoolean } from 'class-validator';


export class Create_Outlet_Dto{

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @ApiProperty({example: "Nakama_Cafe"})
    outlet_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Alamat Toko Mu"})
    outlet_address: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: "outlet1@gmail.com"})
    outlet_email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "087700123456"})
    outlet_phone: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Jalan 1"})
    outlet_area: string;

    @IsOptional()
    @IsInt()
    @ApiProperty({ example: 1 })
    company_id?: string;
  
    @IsOptional()
    @IsInt()
    @ApiProperty({ example: 1 })
    branch_id?: string;

}

export class Update_Outlet_Dto extends PartialType(Create_Outlet_Dto) {}

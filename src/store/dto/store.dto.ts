/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsOptional, IsString, IsInt, IsEmail } from 'class-validator';


export class Create_Store_Dto{

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({example: 1})
    user_id: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @ApiProperty({example: "Nama Toko Mu"})
    store_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Alamat Toko Mu"})
    store_address: string;

}

export class Update_Store_Dto {
    @IsOptional()
    @IsString()
    @MinLength(4)
    @ApiProperty({example: "ganti nama Toko Mu"})
    store_name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({example: "ganti Alamat Toko Mu"})
    store_address: string;
}


export class Invite_User_Dto {

    @IsString()
    @IsOptional()
    @ApiProperty({example: 1})
    invited_user_id: number;

    @IsEmail()
    @IsOptional()
    @ApiProperty({example: "youremail@gmail.com"})
    invited_email: string;
    
}
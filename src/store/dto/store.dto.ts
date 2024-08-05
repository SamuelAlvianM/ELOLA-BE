/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsOptional, IsString, IsInt, IsEmail } from 'class-validator';


export class Create_Store_Dto{

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    store_name: string;

    @IsNotEmpty()
    @IsString()
    store_address: string;

}

export class Update_Store_Dto {
    @IsOptional()
    @IsString()
    @MinLength(4)
    store_name: string;

    @IsOptional()
    @IsString()
    store_address: string;
}


export class Invite_User_Dto {

    @IsString()
    @IsOptional()
    invited_user_id: number;

    @IsEmail()
    @IsOptional()
    invited_email: string;
    
}
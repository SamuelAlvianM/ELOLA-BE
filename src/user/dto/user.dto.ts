import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    user_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}


export class UpdateDto {

    @IsOptional()
    user_name: string;

    @IsOptional()
    email: string;

    @IsOptional()
    @MinLength(8)
    password: string;
    
}
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    user_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    pin: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
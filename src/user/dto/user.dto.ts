/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
export class UserDto {

    @IsNotEmpty()
    user_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsEnum(Role, { message: 'role must be one of the following: admin, user, superadmin' })
    role: Role;
}


export class UpdateDto {

    @IsOptional()
    user_name: string;

    @IsOptional()
    email: string;

    @IsOptional()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsEnum(Role, { message: 'role must be one of the following: admin, user, superadmin' })
    role: Role;
    
}
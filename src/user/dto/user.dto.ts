/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {

    @IsNotEmpty()
    @ApiProperty({example: "Sam"})
    user_name: string;

    @IsEmail()
    @ApiProperty({example: "samuel@example.com"})
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({example: "password"})
    password: string;

    @IsNotEmpty()
    @ApiProperty({example: "USER / STAFF/ OWNER"})
    @IsEnum(Role, { message: 'role must be one of the following: admin, user, superadmin' })
    role: Role;
}


export class UpdateDto {

    @IsOptional()
    @ApiProperty({example: "Sam"})
    user_name: string;

    @IsOptional()
    @ApiProperty({example: "samuel@example.com"})
    email: string;

    @IsOptional()
    @MinLength(8)
    @ApiProperty({example: "password"})
    password: string;

    @IsOptional()
    @ApiProperty({example: "USER / STAFF/ OWNER"})
    @IsEnum(Role, { message: 'role must be one of the following: admin, user, superadmin' })
    role: Role;
    
}
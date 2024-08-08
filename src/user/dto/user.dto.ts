/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class UserDto {

    @IsNotEmpty()
    @ApiProperty({example: "Sam"})
    @Expose()
    user_name: string;

    @IsEmail()
    @ApiProperty({example: "samuel@example.com"})
    @Expose()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({example: "password"})
    @Expose()
    password: string;

    @IsNotEmpty()
    @ApiProperty({example: "USER / STAFF/ OWNER"})
    @Expose()
    @IsEnum(Role, { message: 'role must be one of the following: admin, user, superadmin' })
    role: Role;
}


export class UpdateDto {

    @IsOptional()
    @ApiProperty({example: "Sam"})
    @Expose()
    user_name: string;

    @IsOptional()
    @ApiProperty({example: "samuel@example.com"})
    @Expose()
    email: string;

    @IsOptional()
    @MinLength(8)
    @ApiProperty({example: "password"})
    @Expose()
    password: string;

    @IsOptional()
    @ApiProperty({example: "USER / STAFF/ OWNER"})
    @IsEnum(Role, { message: 'role must be one of the following: admin, user, superadmin' })
    @Expose()
    role: Role;
    
}
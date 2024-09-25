/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';
import { has_role, hierarchy } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class Create_User_Dto {

    @IsNotEmpty()
    @ApiProperty({example: "Samuel"})
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
    @ApiProperty({example: "hr | spv | staff | cashier | waiter | head | owner"})
    @Expose()
    @IsEnum(has_role, { message: `role must be one of the following: ${has_role}` })
    role: has_role;

    @ApiProperty({example:" company | branch | outlet"})
    @IsEnum(hierarchy, {message: `class must be one of the following: ${hierarchy}` })
    class: hierarchy;
}


export class Update_User_Dto {

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
    @ApiProperty({example: "hr | spv | staff | cashier | waiter | head | owner"})
    @IsEnum(has_role, { message: `role must be one of the following: ${has_role}` })
    role: has_role;

    @IsOptional()
    @ApiProperty({example:" company | branch | outlet"})
    @IsEnum(hierarchy, {message: `class must be one of the following: ${hierarchy}` })
    class: hierarchy;
    
}

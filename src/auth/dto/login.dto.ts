/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';


export class Super_Login {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Samuel'})
    @Expose()
    admin_name: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'your_password' })
    @Expose()
    password: string;
}


export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'samuel@gmail.com' })
    @Expose()
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'your_password' })
    @Expose()
    password: string;
}

export class LoginStaffDto {
    @IsNotEmpty()
    @ApiProperty({ example: '6_combinations_number_pin' })
    @Expose()
    pin: string;
}
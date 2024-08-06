/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';


export class Super_Login {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'Samuel'})
    admin_name: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'your_password' })
    password: string;
}


export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'your_password' })
    email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'your_password' })
    password: string;
}

export class LoginStaffDto {
    @IsNotEmpty()
    @ApiProperty({ example: '6_combinations_number_pin' })
    pin: string;
}
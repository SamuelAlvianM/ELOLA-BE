/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';


export class Super_Login_Dto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Samuel'})
    @Expose()
    admin_email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'your_password' })
    @Expose()
    password: string;
}


export class Login_User_Dto {
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

export class Login_Pin_Dto {
    @IsNotEmpty()
    @ApiProperty({ example: '6_combinations_number_pin' })
    @Expose()
    pin: string;
}
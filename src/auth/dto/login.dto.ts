import { IsNotEmpty, IsEmail } from 'class-validator';


export class Super_Login {
    @IsNotEmpty()
    @IsEmail()
    admin_name: string;

    @IsNotEmpty()
    password: string;
}


export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}



export class LoginStaffDto {
    @IsNotEmpty()
    pin: string;
}
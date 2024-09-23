/* eslint-disable prettier/prettier */
import { Controller, 
    Logger,
    Injectable, 
    BadRequestException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Login_Pin_Dto, Login_User_Dto, Super_Login_Dto } from './dto/login.dto';
import { has_role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    // Validation system
    async validateUser(user_name: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: {user_name}});

        if(user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async super_login( super_login: Super_Login_Dto) {
        const super_admin = await this.prisma.super_admin.findUnique({ where: { admin_email: super_login.admin_email}});

        if(!super_admin) {
            throw new BadRequestException(`check your email: ${super_login.admin_email}, because we think you are not Super Admin`);
        }
        const check_valid_password = await bcrypt.compare(super_login.password, super_admin.password);

        if(!check_valid_password) {
            throw new BadRequestException(`Wrong Password, Try again.`);
        }

        const payload = {
            email: super_admin.admin_email,
            sub: super_admin.super_admin_id,
            role: 'super_admin'
        }

        const access_token = this.jwtService.sign(payload);

        return {
            email: super_admin.admin_email,
            admin_name: super_admin.admin_name,
            access_token: access_token
        }
    }

    async login_user(email: string, password: string): Promise<any> {

        const [user, super_admin] = await Promise.all([
            this.prisma.user.findUnique({ where: { email } }),
            this.prisma.super_admin.findUnique({ where: { admin_email: email } }),
        ]);

        if (!user && !super_admin ) {
          throw new BadRequestException(`Wrong email address: ${email}, try again or use another email`);
        }

        const account = user || super_admin;
        const account_password = user? user.password : super_admin.password;
    
        const check_valid_password = await bcrypt.compare(password, account_password);
        if (!check_valid_password) {
          throw new BadRequestException('Wrong Password, Try again.');
        }
    
        const payload = { 
            email: user? user.email : super_admin.admin_email, 
            user_name: user? user.user_name : super_admin.admin_name,
            sub: user? user.user_id : super_admin.super_admin_id,
        };
        return {
            user_name: user? user.user_name : super_admin.admin_name,
            email: user? user.email : super_admin.admin_email,
            access_token: this.jwtService.sign(payload),
        };
      }


      async login_with_pin(login_pin: Login_Pin_Dto) {
        const user = await this.prisma.user.findUnique({ where: {pin: login_pin.pin} });

        const super_admin = await this.prisma.super_admin.findUnique({ where: {admin_pin: login_pin.pin} });
        
        if(!user && !super_admin) {
            throw new BadRequestException(`User not found with pin: ${login_pin.pin}`);
        }

        let account;
        if(user){
            account = user;
        } else {
            account = super_admin
        }

        const payload = { 
            sub: account.user_id || account.super_admin_id, 
            pin: account.pin || account.admin_pin, 
            email: account.email || account.admin_email, 
            user_name: account.user_name || account.admin_name
        };
        const access_token = this.jwtService.sign(payload);

        return {
            user_name: account.user_name || account.admin_name,
            email: account.email || account.admin_email,
            access_token: access_token,
        }
      }
    }


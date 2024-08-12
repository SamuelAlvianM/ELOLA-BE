/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, SuperAdmin } from '@prisma/client';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService, 
        private readonly prisma: PrismaService,
    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        });
    }

    async validate(payload:any) {
        let user: User | SuperAdmin | null = null;

        if( payload.sub) {
            user = await this.prisma.user.findUnique({ where: { user_id: payload.sub } });
        }

        if(!user && payload.pin) {
            user = await this.prisma.user.findUnique({ where: { pin: payload.pin } });
        }

        if (!user) {
            user = await this.prisma.superAdmin.findUnique({ where: { super_admin_id: payload.sub }});
        }

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        console.log('JWT Payload:', payload);
        return user;
    }
}
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { has_role, hierarchy } from '@prisma/client';

interface Jwt_Payload {
  sub: string;
  email: string;
}

export interface User_Payload {
    user_id: string;
    user_name: string;
    email: string;
    pin: string;
    role: has_role;
    class: hierarchy;
    user_type: 'user';
    jwt_payload: Jwt_Payload;
}

export interface Super_Admin_Payload {
    super_admin_id: number;
    role: string;
    admin_email: string;
    admin_name: string;
    admin_pin: string;
    user_type: 'super_admin';
    jwt_payload: Jwt_Payload;
}

export type Auth_Payload = User_Payload | Super_Admin_Payload;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: Jwt_Payload): Promise<Auth_Payload> {
        const user = await this.prisma.user.findUnique({
            where: { user_id: String(payload.sub) }
        });

        if (user) {
            return {
                ...user,
                user_type: 'user' as const,
                jwt_payload: payload
            };
        }

        const superAdmin = await this.prisma.super_admin.findFirst({
            where: {
                OR: [
                    { admin_pin: String(payload.sub) },
                    { admin_email: payload.email }
                ]
            }
        });

        if (superAdmin) {
            return {
                ...superAdmin,
                user_type: 'super_admin' as const,
                jwt_payload: payload
            };
        }

        throw new UnauthorizedException('User not found');
    }
}
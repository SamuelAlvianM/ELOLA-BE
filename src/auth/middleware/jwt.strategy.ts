/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';



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

    async validate(payload: any) {

        const user = await this.prisma.user.findUnique({where: {user_id: payload.sub}});
        if (user) {
            return { 
                ...user,
                 user_type: user.role, 
                 jwt_payload: payload
                };
        }

        const superAdmin = await this.prisma.super_admin.findFirst({ 
            where: { 
                OR: [
                    { admin_pin: payload.sub.toString() },
                    { super_admin_id: typeof payload.sub === 'number' ? payload.sub : undefined }
                ]
            }
        });
        if (superAdmin) {
            return { 
                ...superAdmin, 
                user_type: 'super_admin', 
                jwt_payload: payload};
        }

        throw new UnauthorizedException('User not found');
    }
}
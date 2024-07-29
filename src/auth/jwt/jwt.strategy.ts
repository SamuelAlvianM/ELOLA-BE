import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async validate(payload:any) {
        const user = await this.prisma.user.findUnique({ where: { user_id: payload.sub }});

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
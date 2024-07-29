import { Controller, 
    Logger,
    Injectable, 
    NotFoundException, 
    UnauthorizedException,
    ConflictException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(username: string, email:string, password: string): Promise<any> {

        const existingUser = await this.prisma.user.findFirst({
            
        })
    }


}

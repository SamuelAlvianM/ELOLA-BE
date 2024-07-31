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
import { UserDto } from '../user/dto/user.dto';
import { LoginStaffDto, Super_Login } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async validateUser(user_name: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: {user_name}});

        if(user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    private async generateUniquePin(): Promise<string> {
        let pin: string;
        let isUnique = false;

        while (!isUnique) {
            pin = Math.floor(100000 + Math.random() * 900000).toString();
            const existingUser = await this.prisma.user.findUnique({ 
                where: {pin},
            });
            if (!existingUser) {
                isUnique = true;
            }
        }
        return pin;
    }

    async register(registerUser: UserDto) {
        const payload = await this.prisma.user.findFirst ({
            where:{
                OR: [
                    { user_name: registerUser.user_name},
                    { email: registerUser.email},
                ],
            },
        });

        if (payload) {
            if ( payload.user_name === registerUser.user_name ) {
                throw new ConflictException('User already exists');
            } else {
                throw new ConflictException('email already exists');
            }
        }

        try {
            const hashedPassword = await bcrypt.hash(registerUser.password, 10);
            const uniquePin = await this.generateUniquePin();
            const user = await this.prisma.user.create({
                data: {
                    user_name: registerUser.user_name,
                    email: registerUser.email,
                    password: hashedPassword,
                    role: registerUser.role,
                    pin: uniquePin,
                }
            });

            const payload = { email: user.email, sub: user.user_id };
            const accessToken = await this.jwtService.sign(payload)

            return {user, access_token: accessToken};
        } catch(error) {
            this.logger.error(`Failed to register user: ${error.message}`);
            throw new ConflictException(`Error occured: ${error.message}`);
        }
    }

    async super_login(super_admin_login: Super_Login, password: string): Promise<any> {
        const super_admin = await this.prisma.superAdmin.findFirst({ where: { admin_name: super_admin_login.admin_name } });
    
        if (!super_admin) {
            throw new NotFoundException('I think you are not Admin');
        }
    
        const isPasswordValid = await bcrypt.compare(password, super_admin.password);
    
        if (!isPasswordValid) {
            throw new UnauthorizedException('Check your password again, something went wrong');
        }
    
        const payload = { admin_name: super_admin.admin_name, sub: super_admin.super_admin_id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }



    async login(email: string, password: string): Promise<any> {

        const user = await this.prisma.user.findUnique({ where: { email } });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { email: user.email, sub: user.user_id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }


      async loginWithPin(pin: LoginStaffDto) {
        const user = await this.prisma.user.findUnique({ where: pin});

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const payload = { email: user.email, sub: user.user_id };
        return {
            access_token: this.jwtService.sign(payload),
        }
      }
    }


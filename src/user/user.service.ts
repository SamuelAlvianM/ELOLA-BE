/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Update_User_Dto, Create_User_Dto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { checkForUpdateConflict, checkIfUserExists } from 'src/common/user/user-response';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor( 
      private prisma: PrismaService, 
      private jwtService: JwtService,
    ) {}

    private async generate_unique_pin(): Promise<string> {
        let pin: string;
        let isUnique = false;
    
        while (!isUnique) {
          pin = Math.floor(100000 + Math.random() * 900000).toString();
          const existingUser = await this.prisma.user.findUnique({
            where: { pin },
          });
          if (!existingUser) {
            isUnique = true;
          }
        }
        return pin;
      }

    async register_new_user(register_user: Create_User_Dto) {
        const payload = await this.prisma.user.findFirst ({
            where:{
                OR: [
                    { user_name: register_user.user_name},
                    { email: register_user.email},
                ],
            },
        });

        if (payload) {
            if ( payload.user_name === register_user.user_name ) {
                throw new ConflictException(`User name: ${register_user.user_name} already exists`);
            } else {
                throw new ConflictException(`email: ${register_user.email} already exists`);
            }
        }

        try {
            const hashed_pass = await bcrypt.hash(register_user.password, 10);
            const unique_pin = await this.generate_unique_pin();
            const user = await this.prisma.user.create({
                data: {
                    user_name: register_user.user_name,
                    email: register_user.email,
                    password: hashed_pass,
                    role: register_user.role,
                    class: register_user.class,
                    pin: unique_pin,
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
    

    async get_all_users(page: number, limit: number) {
      const max_limit = 10;
      const normal_limit = Math.min(limit, max_limit)
      const skip = (page - 1) * normal_limit;
      const [users, total_count] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where: {
            deleted_at: null,
          },
          skip: skip,
          take: normal_limit,
        }),
        this.prisma.user.count({
          where: {
            deleted_at: null,

          },
        }),
      ]);
  
      return {
        data: users,
        meta: {
          currentPage: page,
          itemsPerPage: normal_limit,
          totalPages: Math.ceil(total_count / normal_limit ),
          totalItems: total_count,
        },
      };
    }

    async get_user_by_id(user_id: string): Promise<user> {
        const user = await this.prisma.user.findFirst({
            where: {
                user_id,
                deleted_at: null,
            },
            include: {
              company: true,
              branches: true,
              outlet: true,
              order: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found or has been deleted.`);
        }

        return user;
    }

    async filter_active_user():Promise<user[]> {
      return this.prisma.user.findMany({
        where: {
          is_deleted: false,
          deleted_at: null,
        }
      });
    }

    async update_user_data(user_id: string, update_dto: Update_User_Dto) {
        const user = await this.prisma.user.findUnique({ where: { user_id: user_id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const existing_user = await this.prisma.user.findFirst({
            where: {
              OR: [
                { email: update_dto.email },
                { user_name: update_dto.user_name },
              ],
            },
          });
      
          checkForUpdateConflict(existing_user, update_dto);

        const updatedUser = await this.prisma.user.update({
            where: { user_id: user_id },
            data: {
                user_name: update_dto.user_name,
                email: update_dto.email,
            },
        });

        return updatedUser
    }

    async soft_delete_user(user_id: string): Promise<user> {
        return this.prisma.user.update({
            where: {
                user_id
            },
            data: {
                deleted_at: new Date(),
                is_deleted: true,
            },
        });
    }

    async get_current_user(user_id: string): Promise<user> {
      const user = await this.prisma.user.findFirst({
        where:{
          user_id,
          deleted_at: null,
        },
        include: {
          company: true,
          branches: true,
          outlet: true,
          order: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found or has been deleted.`);
      }

      return user
    }
}
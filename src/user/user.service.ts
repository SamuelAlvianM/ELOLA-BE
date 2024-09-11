/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { checkForUpdateConflict, checkIfUserExists } from 'src/common/user/user-response';

@Injectable()
export class UserService {
    constructor( private prisma: PrismaService) {}

    private async generateUniquePin(): Promise<string> {
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

    async createNewUser(user_dto: UserDto) {
        const hashed_password = await bcrypt.hash(user_dto.password, 10);
        const unique_pin = await this.generateUniquePin();
        const existing_user = await this.prisma.user.findFirst({
            where: {
              OR: [
                { email: user_dto.email },
                { user_name: user_dto.user_name },
              ],
            },
          });
      
          checkIfUserExists(existing_user, user_dto);
        
        return this.prisma.user.create({
            data: {
                ...user_dto,
                role: user_dto.role,
                password: hashed_password,
                pin: unique_pin,
            },
        });
    }

    async findAllUser(page: number, limit: number) {
      const maxLimit = 10;
      const normalLimit = Math.min(limit, maxLimit)
      const skip = (page - 1) * normalLimit;
      const [users, totalCount] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where: {
            deleted_at: null,
          },
          skip: skip,
          take: normalLimit,
          include: {
            store: true,
            store_staff: true,
            transaction: true,
          },
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
          "Current Page": page,
          "Items per Page": normalLimit,
          "Total Pages": Math.ceil(totalCount / limit),
          "Total Items": totalCount,
        },
      };
    }

    async findOne(user_id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                user_id,
                deleted_at: null,
            },
            include: {
              store: true,
              store_staff: true,
              transaction: true,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found or has been deleted.`);
        }

        return user;
    }

    async updateUserData(user_id: number, update_dto: UpdateDto) {
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

    async softDeleteUser(user_id: number): Promise<User> {
        return this.prisma.user.update({
            where: {
                user_id
            },
            data: {
                deleted_at: new Date()
            }
        })
    }

    async getCurrentUser(user_id: number): Promise<User> {
      const user = await this.prisma.user.findFirst({
        where:{
          user_id,
          deleted_at: null,
        },
        include: {
          store: true,
          store_staff: true,
          transaction: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found or has been deleted.`);
      }

      return user
    }
}
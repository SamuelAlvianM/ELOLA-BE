/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

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

    async create(user_dto: UserDto) {
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
      
          if (existing_user) {
            if (existing_user.email === user_dto.email) {
              throw new BadRequestException(`Email ${user_dto.email} already exists`);
            }
            if (existing_user.user_name === user_dto.user_name) {
              throw new BadRequestException(`Username ${user_dto.user_name} already exists`);
            }
          }
        return this.prisma.user.create({
            data: {
                ...user_dto,
                role: user_dto.role,
                password: hashed_password,
                pin: unique_pin,
            },
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                deleted_at: null,
            }
        });
    }

    async findOne(user_id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                user_id,
                deleted_at: null,
            }
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found or has been deleted.`);
        }

        return user;
    }

    async update(user_id: number, update_dto: UpdateDto) {
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
      
          if (existing_user) {
            if (existing_user.email === update_dto.email) {
              throw new BadRequestException(`Email ${update_dto.email} already exists`);
            }
            if (existing_user.user_name === update_dto.user_name) {
              throw new BadRequestException(`Username ${update_dto.user_name} already exists`);
            }
          }

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
}
import { Controller, UseGuards, Get, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateDto } from './dto/user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('user')
export class UserController {
    constructor(private prisma: PrismaService) {}



}

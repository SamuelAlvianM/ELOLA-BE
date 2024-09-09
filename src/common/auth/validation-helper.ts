import { HttpStatus, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { errorResponse } from '../response-handler';

export async function validate_user_by_email( prisma: PrismaService, email: string ) {
    const user_email = await prisma.user.findUnique({ where: {email} });

    if (!user_email) {
        throw new NotFoundException(errorResponse(HttpStatus.NOT_FOUND, `User ${user_email} not found, please make sure you have a valid email address, try again or go to register page`));
    }

    return user_email;
}

export async function validate_user_name(prisma: PrismaService, user_name: string) {
    const username = await prisma.user.findUnique({ where: {user_name} });

    if (!username) {
        throw new NotFoundException(errorResponse(HttpStatus.BAD_REQUEST, `your input ${username} already exist, use another username`));
    }

    return username;
}

export async function validatePassword(inputPassword: string, storedPassword: string) {
    const isPasswordValid = await bcrypt.compare(inputPassword, storedPassword);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException(errorResponse(HttpStatus.UNAUTHORIZED, 'Invalid credentials'));
    }
  }
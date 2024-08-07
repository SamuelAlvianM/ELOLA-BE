/* eslint-disable prettier/prettier */
import { Controller, Post, Request, Body, UseGuards, Req, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto, LoginStaffDto, Super_Login } from './dto/login.dto';
import { Role } from '@prisma/client';
import { Roles } from '../utils/decorator/roles.decorator';
import { RolesGuard} from '../utils/guard/roles.guard';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import {
    ApiTags,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
        
    @Post('register')
    @ApiBearerAuth('JWT')
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse( {status: 201, description: 'Successfully registered'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    async register(
        @Body() user_dto: UserDto){
        const result = await this.authService.register(user_dto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Successfully registered',
            data: result,
        };
    }

    @Post('super-login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully logged in'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async login_super_admin(
        @Body() login_super_admin: Super_Login){
        const result = await this.authService.super_login(login_super_admin, login_super_admin.password);
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in',
            data: result,
        };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully logged in'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async login(
        @Body() login_dto: LoginDto){
        const result = await this.authService.login(login_dto.email, login_dto.password);
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in',
            data: result,
        };
    }

    @Post('login/pin')
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully logged in'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async loginStaff(
        @Body() pin: LoginStaffDto){
        const result = await this.authService.loginWithPin(pin);
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in',
            data: result,
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse( {status: 204, description: 'Successfully logged out'})
    async logout(@Req() req:any) {
        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'Successfully logged out',
            data: req.user,
        };
    }

    @Get('user')
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully logged in'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async thisUser(@Req() req:any) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in',
            data: req.user,
        };
    }

}

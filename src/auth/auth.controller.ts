/* eslint-disable prettier/prettier */
import { bad_request_response, login_response, register_response, unauthorized_response, not_found_response } from '../../tests/swagger/auth.swagger';
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
    @ApiResponse(register_response)
    @ApiResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
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
    @ApiResponse(login_response)
    @ApiResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBearerAuth()
    async login_super_admin(
        @Body() login_super_admin: Super_Login){
        const result = await this.authService.super_login(login_super_admin, login_super_admin.password);
        return {
            statusCode: HttpStatus.OK,
            message: 'Super Admin Successfully login ',
            data: result,
        };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse(login_response)
    @ApiResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
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
    @ApiResponse(login_response)
    @ApiResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
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
    @ApiResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBearerAuth()
    async thisUser(@Req() req:any) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in',
            data: req.user,
        };
    }

}

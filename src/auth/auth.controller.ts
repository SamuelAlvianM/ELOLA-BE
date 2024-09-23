/* eslint-disable prettier/prettier */
import { bad_request_response, login_response, unauthorized_response, not_found_response } from '../../tests/swagger/auth.swagger';
import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login_User_Dto, Login_Pin_Dto, Super_Login_Dto } from './dto/login.dto';
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
        

    @Post('super-login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse(login_response)
    @ApiResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBearerAuth()
    async login_super_admin(
        @Body() login_super_admin: Super_Login_Dto){
        const result = await this.authService.super_login(login_super_admin);
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
        @Body() login_dto: Login_User_Dto){
        const result = await this.authService.login_user(login_dto.email, login_dto.password);
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
        @Body() pin: Login_Pin_Dto){
        const result = await this.authService.login_with_pin(pin);
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
            data: req.user_name,
        };
    }

}

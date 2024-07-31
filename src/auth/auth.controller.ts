import { Controller, Post, Request, Body, UseGuards, Req, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto, LoginStaffDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { Roles } from '../utils/decorator/roles.decorator';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import {
    ApiTags,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
        
    @Post('register')
    @Roles(Role.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse( {status: 201, description: 'Successfully registered'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async register(
        @Body() user_dto: UserDto){
        const result = await this.authService.register(user_dto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Successfully registered',
            data: result,
        };
    }

    @Post('login/owner')
    @UseGuards(JwtAuthGuard)
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

    @Post('login/staff')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully logged in'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async loginStaff(
        @Body('pin') pin: LoginStaffDto){
        const result = await this.authService.loginWithPin(pin);
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully logged in',
            data: result,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse( {status: 204, description: 'Successfully logged out'})
    async logout(@Req() req:any) {
        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'Successfully logged out',
            data: req.user,
        };
    }

    @UseGuards(JwtAuthGuard)
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

/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Get, Post, Body, HttpCode, HttpStatus, Delete, Param, Patch, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateDto } from './dto/user.dto';
import { Roles } from '../utils/decorator/roles.decorator';
import {
    ApiTags,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Role } from '@prisma/client';
import { RolesGuard } from '../utils/guard/roles.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private user_service: UserService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiBearerAuth('JWT')
    @ApiResponse( {status: 201, description: 'Successfully created'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async create(
        @Body() user_dto: UserDto){
        const result = await this.user_service.create(user_dto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Successfully Created new User',
            data: result,
        };
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiBearerAuth('JWT')
    @ApiResponse( {status: 200, description: 'List of User'})
    @ApiBadRequestResponse({status: 400, description: 'Bad Request! Something wrong when Fetching Data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findAll() {
        const result = await this.user_service.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'List of User',
            data: result,
        };
    }

    @Get(':user_id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT')
    @ApiResponse( {status: 200, description: 'List of User'})
    @ApiBadRequestResponse({status: 400, description: 'Bad Request! Something wrong when Fetching Data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findOne(@Param('user_id') user_id: number) {
        const result = await this.user_service.findOne(+user_id);
        return {
            statusCode: HttpStatus.OK,
            message: 'List of User',
            data: result,
        };
    }

    @Patch(':user_id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
    @ApiBearerAuth('JWT')
    @ApiResponse( {status: 200, description: 'This is updated user data'})
    @ApiBadRequestResponse({status: 400, description: 'Bad Request! Update Data failed!'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async update(@Param('user_id') user_id: number, @Body() update_dto: UpdateDto) {
        const result = await this.user_service.update(+user_id, update_dto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Data Update Success!',
            data: result,
        };
    }

    @Delete(':user_id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiBearerAuth('JWT')
    @ApiResponse( {status: 204, description: 'Data Successfully Deleted!'})
    @ApiBadRequestResponse({status: 400, description: 'Bad Request! Something wrong when deleting Data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async softDeleteUser(@Param('user_id') user_id: number) {
        const user = await this.user_service.softDeleteUser(+user_id);

        if (!user) {
            throw new NotFoundException ("Data User Not Found!")
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Data Successfully Deleted!',
            data: user,
        };
    }
}
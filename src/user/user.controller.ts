/* eslint-disable prettier/prettier */
import { unauthorized_response, unauthorized_role_response, bad_request_response, not_found_response, create_user_response, get_all_users_response, get_user_by_id_response, update_user_response, delete_user_response } from '../../tests/swagger/user/user.swagger';
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
    ApiNotFoundResponse,
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
    @ApiResponse( create_user_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBearerAuth()
    async create(
        @Body() user_dto: UserDto){
        const result = await this.user_service.create(user_dto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Successfully created new User',
            data: result,
        };
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiBearerAuth('JWT')
    @ApiResponse( get_all_users_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async findAll() {
        const result = await this.user_service.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully retrieved all data users',
            data: result,
        };
    }

    @Get(':user_id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT')
    @ApiResponse( get_user_by_id_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async findOne(@Param('user_id') user_id: number) {
        const result = await this.user_service.findOne(+user_id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully fetched user by id',
            data: result,
        };
    }

    @Patch(':user_id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
    @ApiBearerAuth('JWT')
    @ApiResponse( update_user_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
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
    @ApiResponse( delete_user_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
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
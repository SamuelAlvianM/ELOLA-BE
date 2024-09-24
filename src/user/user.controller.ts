/* eslint-disable prettier/prettier */
import { unauthorized_response, unauthorized_role_response, bad_request_response, not_found_response, create_user_response, get_all_users_response, get_user_by_id_response, update_user_response, delete_user_response } from '../../tests/swagger/user.swagger';
import { Controller, UseGuards, Get, Post, Body, HttpCode, HttpStatus, Delete, Param, Patch, NotFoundException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Create_User_Dto, Update_User_Dto } from './dto/user.dto';
import { Class, Roles } from '../utils/decorator/roles.decorator';
import {
    ApiTags,
    ApiQuery,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from '../utils/guard/roles.guard';
import { has_role, hierarchy } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('user')
@UseGuards(JwtAuthGuard, Roles_Guards)
@Roles(has_role.hr, has_role.spv, has_role.owner, has_role.head, has_role.manager)
@Class(hierarchy.company, hierarchy.branch, hierarchy.outlet)
@ApiBearerAuth('JWT')
export class UserController {
    constructor(private user_service: UserService) {}

    @Post()
    @ApiResponse( create_user_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async create(
        @Body() user_dto: Create_User_Dto){
        const result = await this.user_service.register_new_user(user_dto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Successfully created new User',
            data: result,
        };
    }

    @Get()
    @ApiResponse( get_all_users_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async findAll(@Query('page') page: number, @Query('limit') limit: number) {
        return this.user_service.get_all_users(page, limit);
      }

    @Get(':user_id')
    @ApiResponse( get_user_by_id_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async findOne(@Param('user_id') user_id: number) {
        const result = await this.user_service.get_user_by_id(+user_id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully fetched user by id',
            data: result,
        };
    }

    @Get('active-users')
    async get_active_users() {
        const active_users = await this.user_service.filter_active_user();
        return {
            statusCode: HttpStatus.OK,
            message: 'Successfully filtered active users',
            data: active_users,
        }
    }

    @Patch(':user_id')
    @ApiResponse( update_user_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async update(@Param('user_id') user_id: number, @Body() update_dto: Update_User_Dto) {
        const result = await this.user_service.update_user_data(+user_id, update_dto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Data Update Success!',
            data: result,
        };
    }

    @Delete(':user_id')
    @ApiResponse( delete_user_response )
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async softDeleteUser(@Param('user_id') user_id: number) {
        const user = await this.user_service.soft_delete_user(+user_id);

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
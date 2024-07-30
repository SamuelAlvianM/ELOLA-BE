import { Controller, UseGuards, Get, Post, Body, HttpCode, HttpStatus, Delete, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateDto } from './dto/user.dto';
import {
    ApiTags,
    ApiResponse,
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private user_service: UserService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse( {status: 201, description: 'Successfully created'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
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
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'This is All users data'})
    @ApiBadRequestResponse({status: 400, description: 'Something wrong when fetching data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findAll() {
        const result = await this.user_service.findAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'This is All users data',
            data: result,
        };
    }

    @Get(':user_id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'This is user data'})
    @ApiBadRequestResponse({status: 400, description: 'Something wrong when fetching data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findOne(@Param('user_id') user_id: number) {
        const result = await this.user_service.findOne(+user_id);
        return {
            statusCode: HttpStatus.OK,
            message: 'This is user data',
            data: result,
        };
    }

    @Patch(':user_id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'This is updated user data'})
    @ApiBadRequestResponse({status: 400, description: 'Something wrong when updating data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async update(@Param('user_id') user_id: number, @Body() update_dto: UpdateDto) {
        const result = await this.user_service.update(+user_id, update_dto);
        return {
            statusCode: HttpStatus.OK,
            message: 'This is updated user data',
            data: result,
        };
    }

    @Delete(':user_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse( {status: 204, description: 'This is deleted user data'})
    @ApiBadRequestResponse({status: 400, description: 'Something wrong when deleting data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async remove(@Param('user_id') user_id: number) {
        const result = await this.user_service.remove(+user_id);
        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'This is deleted user data',
            data: result,
        };
    }


}

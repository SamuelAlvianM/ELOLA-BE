/* eslint-disable prettier/prettier */
import { unauthorized_response, get_staff_bad_request_response, delete_store_staff_bad_request_response, delete_store_staff_response, get_staff_response, unauthorized_role_response, create_store_bad_request_response, create_store_response, get_all_stores_bad_request_response, get_all_stores_response, get_store_by_id_bad_request_response, get_store_by_id_response, update_store_response, update_store_bad_request_response, delete_store_response, delete_store_bad_request_response, invite_user_response, invite_user_bad_request_response} from '../../tests/swagger/store.swagger'
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Param, Patch, Delete, BadRequestException, ParseIntPipe, Query} from '@nestjs/common';

import { has_role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';

import { StoreService } from './store.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Store_Dto, Invite_User_Dto, Update_Store_Dto } from './dto/store.dto';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller('store')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class StoreController {
//     constructor(private store_service: StoreService, private prisma: PrismaService) {}

//     @Post(':user_id')
//     @HttpCode(HttpStatus.CREATED)
//     @Roles(Role.SUPER_ADMIN, Role.OWNER)
//     @ApiResponse( create_store_response)
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(create_store_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     async createNewStore(
//         @Param('user_id', ParseIntPipe) user_id: number, 
//         @Body() create_store: Create_Store_Dto) {
//         const result = await this.store_service.createNewStore(user_id, create_store);
//       return {
//           StatusCode: HttpStatus.CREATED,
//           response: 'Created new Store',
//           data: result,
//       };
//     }

//     @Post(':store_id/invite')
//     @HttpCode(HttpStatus.CREATED)
//     @Roles(Role.SUPER_ADMIN, Role.OWNER)
//     @ApiResponse( invite_user_response)
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(invite_user_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     async invite_to_store(
//         @User() user: any, 
//         @Param('store_id', ParseIntPipe) store_id: number,
//         @Body() invite_user: Invite_User_Dto,
//     ) {
//         const result = await this.store_service.invite_to_store(user.user_id, store_id, invite_user);
//         return {
//             StatusCode: HttpStatus.CREATED,
//             response: 'Invited new Staff, ',
//             data: result,
//         };
//     }

//     @Get()
//     @HttpCode(HttpStatus.OK)
//     @ApiResponse( get_all_stores_response)
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(get_all_stores_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
//     @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
//     async findAllStore(@Query('page') page: number, @Query('limit') limit: number) {
//         return this.store_service.findAllStore(page, limit);
//       }

//     @Get('staff')
//     @HttpCode(HttpStatus.OK)
//     @ApiResponse( get_staff_response )
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(get_staff_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
//     @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
//     async findAllStoreStaff(@Query('page') page: number, @Query('limit') limit: number) {
//         const result = await this.store_service.findAllStoreStaff(page, limit);
//         return {
//             StatusCode: HttpStatus.OK,
//             response: 'Successfully fetched all Staffs',
//             data: result,
//         };
//     }

//     @Get(':store_staff_id')
//     @HttpCode(HttpStatus.OK)
//     @ApiResponse( get_staff_response )
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(get_staff_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     async findOne(@Param('store_staff_id') store_staff_id: number) {
//         const result = await this.store_service.findOne(+store_staff_id);
//         return {
//             StatusCode: HttpStatus.OK,
//             response: 'Successfully fetched Staff',
//             data: result,
//         };
//     }
    

//     @Patch()
//     @HttpCode(HttpStatus.OK)
//     @Roles(Role.SUPER_ADMIN, Role.OWNER)
//     @ApiResponse( update_store_response )
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(update_store_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     async update(@User() user: any, @Body() update_store: Update_Store_Dto) {

//         const result = await this.store_service.update(user.user_id, update_store);
//         return {
//             StatusCode: HttpStatus.OK,
//             response: 'Successfully updated store',
//             data: result,
//         };
//     }

//     @Delete(':store_id')
//     @ApiBearerAuth('JWT')
//     @Roles(Role.SUPER_ADMIN, Role.OWNER)
//     @ApiResponse( delete_store_response )
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(delete_store_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     async delete(@Param('store_id') store_id: string) {
//         const parsedStoreId = parseInt(store_id, 10);
        
//         if (isNaN(parsedStoreId)) {
//             throw new BadRequestException('Invalid store_id');
//         }
//       const result = await this.store_service.delete(parsedStoreId);
//       return {
//         StatusCode: HttpStatus.OK,
//         response: 'Successfully deleted store',
//         data: result,
//       };
//     }
  
//     @Delete('staff/:store_staff_id')
//     @ApiResponse( delete_store_staff_response )
//     @ApiResponse( unauthorized_role_response)
//     @ApiBadRequestResponse(delete_store_staff_bad_request_response)
//     @ApiUnauthorizedResponse(unauthorized_response)
//     @ApiBearerAuth('JWT')
//     @Roles(Role.SUPER_ADMIN, Role.OWNER)
//     async deleteStaff(@Param('store_staff_id', ParseIntPipe) store_staff_id: number) {
//       const result = await this.store_service.deleteStaff(store_staff_id);
//       return {
//         StatusCode: HttpStatus.OK,
//         response: 'Successfully deleted staff',
//         data: result,
//       };
//     }
    

}

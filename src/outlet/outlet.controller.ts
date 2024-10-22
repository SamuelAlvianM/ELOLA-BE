/* eslint-disable prettier/prettier */
import { unauthorized_response, get_staff_bad_request_response, delete_store_staff_bad_request_response, delete_store_staff_response, get_staff_response, unauthorized_role_response, create_store_bad_request_response, create_store_response, get_all_stores_bad_request_response, get_all_stores_response, get_store_by_id_bad_request_response, get_store_by_id_response, update_store_response, update_store_bad_request_response, delete_store_response, delete_store_bad_request_response, invite_user_response, invite_user_bad_request_response} from '../../tests/swagger/store.swagger'
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Param, Patch, Delete, BadRequestException, ParseIntPipe, Query} from '@nestjs/common';
import { has_role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { OutletService } from './outlet.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Outlet_Dto, Update_Outlet_Dto } from './dto/outlet.dto';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Outlets')
@Controller('outlet')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class OutletController {
    constructor( private outlet_service: OutletService, ) {}

    @Post()
    @ApiResponse( create_store_response)
    @ApiResponse( unauthorized_role_response)
    @ApiBadRequestResponse(create_store_bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async create_new_store(
        @User() user: string, 
        @Body() create_store: Create_Outlet_Dto) {
        const result = await this.outlet_service.create_new_store(user, create_store);
      return {
          StatusCode: HttpStatus.CREATED,
          response: 'Created new Store',
          data: result,
      };
    }

    @Get()
    @ApiResponse( get_all_stores_response)
    @ApiResponse( unauthorized_role_response)
    @ApiBadRequestResponse(get_all_stores_bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async get_all_active_outlets(@Query('page') page: number, @Query('limit') limit: number) {
        const all_data_active = await this.outlet_service.get_all_active_outlets(page, limit);
        return {
            status_code: HttpStatus.OK,
            message: 'Successfully retrieved all active outlets',
            data: all_data_active,
        }
      }

    @Get()
    @ApiResponse( get_all_stores_response)
    @ApiResponse( unauthorized_role_response)
    @ApiBadRequestResponse(get_all_stores_bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async get_all_outlets(@Query('page') page: number, @Query('limit') limit: number) {
        const entire_data = await this.outlet_service.get_all_outlets(page, limit);
        return {
            status_code: HttpStatus.OK,
            message: 'This is all data available and deleted outlets successfully retrieved.',
            data: entire_data,
        }
      }
    
    @Patch(':outlet_id')
    @ApiResponse( update_store_response )
    @ApiResponse( unauthorized_role_response)
    @ApiBadRequestResponse(update_store_bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async update(
      @Body() update_outlet: Update_Outlet_Dto,
      @Param('outlet_id', ParseIntPipe) outlet_id: string,
    ) {

        const result = await this.outlet_service.update_outlet_data( outlet_id, update_outlet);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully updated store',
            data: result,
        };
    }

    @Delete(':outlet_id/soft-delete')
    @ApiResponse( delete_store_response )
    @ApiResponse( unauthorized_role_response)
    @ApiBadRequestResponse(delete_store_bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async soft_delete_data_outlet(@Param('outlet_id') outlet_id: string) {
      const result = await this.outlet_service.soft_delete_outlet(outlet_id);
      return {
        StatusCode: HttpStatus.OK,
        response: 'Successfully deleted store',
        data: result,
      };
    }
  
    @Delete(':outlet_id/permanent-delete')
    @ApiResponse( delete_store_staff_response )
    @ApiResponse( unauthorized_role_response)
    @ApiBadRequestResponse(delete_store_staff_bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async permanent_delete_outlet_data(@Param('outlet_id') outlet_id: string) {
      const result = await this.outlet_service.permanent_delete_outlet(outlet_id);
      return {
        StatusCode: HttpStatus.OK,
        response: 'Successfully delete permanent outlet data',
        data: result,
      };
    }
    

}

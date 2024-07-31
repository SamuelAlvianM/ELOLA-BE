import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Param, Patch, Delete} from '@nestjs/common';

import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';

import { StoreService } from './store.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Store_Dto, Invite_User_Dto, Update_Store_Dto } from './dto/store.dto';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('store')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreController {
    constructor(private store_service: StoreService, private prisma: PrismaService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiResponse( {status: 201, description: 'Successfully created'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async create(@User() user: any, @Body() create_store: Create_Store_Dto) {
        const result = this.store_service.create(user.user_id, create_store);
      return {
          StatusCode: HttpStatus.CREATED,
          response: 'Created new Store',
          data: result,
      };
    }

    @Post(':store_id/invite')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiResponse( {status: 201, description: 'Successfully invited new staff'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async invite_to_store(
        @User() user: any, 
        @Body('store_id') store_id: number,
        @Body() invite_user: Invite_User_Dto,
    ) {
        const result = await this.store_service.invite_to_store(user.user_id, store_id, invite_user);
        return {
            StatusCode: HttpStatus.CREATED,
            response: 'Invited new Staff, ',
            data: result,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: 200, description: 'Successfully fetched all stores'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findAllStore() {
        const result = await this.store_service.findAllStore();
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all stores',
            data: result,
        };
    }

    @Get('staff')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: 200, description: 'Successfully fetched all Staffs'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findAllStoreStaff() {
        const result = await this.store_service.findAllStoreStaff();
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all Staffs',
            data: result,
        };
    }

    @Get(':store_staff_id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: 200, description: 'Successfully fetched Staff'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findOne(@Param('store_staff_id') store_staff_id: number) {
        const result = await this.store_service.findOne(+store_staff_id);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched Staff',
            data: result,
        };
    }
    

    @Patch()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @ApiResponse({status: 200, description: 'Successfully updated Store'})
    @ApiUnauthorizedResponse({status: 401, description: 'Unauthorized'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiBearerAuth()
    async update(@User() user: any, @Body() update_store: Update_Store_Dto) {
        const result = await this.store_service.update(user.user_id, update_store);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully updated store',
            data: result,
        };
    }

    @Delete(':store_id')
    @ApiResponse({ status: 200, description: 'Successfully deleted store' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBadRequestResponse({ status: 400, description: 'Invalid data' })
    @ApiBearerAuth()
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    async delete(@Param('store_id') store_id: number) {
      const result = await this.store_service.delete(store_id);
      return {
        StatusCode: HttpStatus.OK,
        response: 'Successfully deleted store',
        data: result,
      };
    }
  
    @Delete('staff/:store_staff_id')
    @ApiResponse({ status: 200, description: 'Successfully deleted staff' })
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBadRequestResponse({ status: 400, description: 'Invalid data' })
    @ApiBearerAuth()
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    async deleteStaff(@Param('store_staff_id') store_staff_id: number) {
      const result = await this.store_service.deleteStaff(store_staff_id);
      return {
        StatusCode: HttpStatus.OK,
        response: 'Successfully deleted staff',
        data: result,
      };
    }
    

}

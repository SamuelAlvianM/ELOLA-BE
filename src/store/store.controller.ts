import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Param} from '@nestjs/common';
import { StoreService } from './store.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { Create_Store_Dto, Invite_User_Dto, Update_Store_Dto } from './dto/store.dto';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('store')
export class StoreController {
    constructor(private store_service: StoreService, private prisma: PrismaService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
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
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
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
    @UseGuards(JwtAuthGuard)
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

    @Get()
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
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
    

}

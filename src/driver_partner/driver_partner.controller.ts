import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DriverPartnerService } from './driver_partner.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { RolesGuard } from '../utils/guard/roles.guard';
import { Roles } from '../utils/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Create_DP_Dto, Update_DP_Dto } from './dto/dp.dto';
import { CurrentStore, User } from 'src/utils/decorator/user.decorator';

@Controller('driver-partner')
export class DriverPartnerController {
    constructor(private service_dp: DriverPartnerService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
    @ApiResponse( {status: 201, description: 'Successfully get all data drivers partner'})
    @ApiBadRequestResponse({status: 400, description: 'error when fetching all data drivers'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    async getDriver_Partners() {
        const result = await this.service_dp.findAll_Driver_Partner();

        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all driver partners',
            data: result,
        }
    }

    @Get(':driver_partner_id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully fetched driver partner'})
    @ApiBadRequestResponse({status: 400, description: 'error when fetching all data drivers'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    async getDriver_Partner(@Param('driver_partner_id') driver_partner_id: number) {
        const result = await this.service_dp.findOne_Driver_Partner(driver_partner_id);

        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched driver partner',
            data: result,
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse( {status: 201, description: 'Successfully created driver partner'})
    @ApiBadRequestResponse({status: 400, description: 'error when creating driver partner'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    async createDriver_Partner(
        @Body() create_driver_partner: Create_DP_Dto,
    ) {
        const result = await this.service_dp.create_Driver_Partner(create_driver_partner);
        return {
            StatusCode: HttpStatus.CREATED,
            response: 'Successfully created driver partner',
            data: result,

        }
    }

    @Patch()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully updated driver partner'})
    @ApiUnauthorizedResponse({status: 401, description: 'Unauthorized'})
    @ApiBadRequestResponse({status: 400, description: 'error when updating driver partner'})
    async updateDriver_Partner(@Body() update_driver_partner: Update_DP_Dto, driver_partner_id: number) {
        const result = await this.service_dp.update_driver_partner(update_driver_partner, driver_partner_id);

        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully updated driver partner',
            data: result,
        }
    }

    @Delete()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.OWNER, Role.SUPER_ADMIN)
    @HttpCode(HttpStatus.OK)
    @ApiResponse( {status: 200, description: 'Successfully deleted driver partner'})
    @ApiUnauthorizedResponse({status: 401, description: 'Unauthorized'})
    @ApiBadRequestResponse({status: 400, description: 'error when deleting driver partner'})
    async deleteDriver_Partner(@Param('driver_partner_id') driver_partner_id: number) {
        const result = await this.service_dp.delete_driver_partner(driver_partner_id);

        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully deleted driver partner',
            data: result,
        }
    }

}

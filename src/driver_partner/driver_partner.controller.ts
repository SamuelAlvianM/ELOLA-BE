/* eslint-disable prettier/prettier */
import { get_all_dp_bad_request_response, get_all_dp_response, unauthorized_response, unauthorized_role_response, det_dp_by_id_response, det_dp_by_id_bad_request_response, create_dp_response, create_dp_bad_request_response, update_dp_response, update_dp_bad_request_response, delete_dp_response, delete_dp_bad_request_response } from '../../tests/swagger/driver_partner.swagger';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { DriverPartnerService } from './driver_partner.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { Roles_Guards } from '../utils/guard/roles.guard';
import { Roles } from '../utils/decorator/roles.decorator';
import { has_role } from '@prisma/client';
import { ApiBadRequestResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Create_DP_Dto, Update_DP_Dto } from './dto/dp.dto';
import { CurrentStore, User } from 'src/utils/decorator/user.decorator';

@ApiTags('Driver Partners')
@Controller('driver-partner')
@UseGuards(JwtAuthGuard, Roles_Guards)
@ApiBearerAuth('JWT')
export class DriverPartnerController {
    constructor(private service_dp: DriverPartnerService) {}

    @Get()
    @Roles()
    @ApiResponse( get_all_dp_response )
    @ApiResponse( unauthorized_role_response )
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBadRequestResponse(get_all_dp_bad_request_response)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async get_driver_partners(@Query('page') page: number, @Query('limit') limit: number) {
        const drivers = await this.service_dp.findAll_Driver_Partner(page, limit);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all driver partners',
            data: drivers,
        }
    }

    @Get(':driver_partner_id')
    @Roles()
    @ApiResponse( det_dp_by_id_response )
    @ApiResponse( unauthorized_role_response )
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBadRequestResponse(det_dp_by_id_bad_request_response)
    async getDriver_Partner(@Param('driver_partner_id', ParseIntPipe) driver_partner_id: number) {
        const result = await this.service_dp.findOne_Driver_Partner(driver_partner_id);

        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched driver partner',
            data: result,
        }
    }

    @Post(':outlet_id')
    @Roles()
    @ApiResponse( create_dp_response )
    @ApiResponse( unauthorized_role_response )
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBadRequestResponse(create_dp_bad_request_response)
    async createDriver_Partner(
        @Param('outlet_id' ) outlet_id: string,
        @Body() create_driver_partner: Create_DP_Dto,
    ) {
        const result = await this.service_dp.create_Driver_Partner(create_driver_partner, outlet_id);
        return {
            StatusCode: HttpStatus.CREATED,
            response: 'Successfully created driver partner',
            data: result,

        }
    }

    @Patch(':driver_partner_id')
    @Roles()
    @ApiResponse( update_dp_response )
    @ApiResponse( unauthorized_role_response )
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBadRequestResponse(update_dp_bad_request_response)
    async updateDriver_Partner(
        @Param('driver_partner_id', new ParseIntPipe()) driver_partner_id: number,
        @Body() update_driver_partner: Update_DP_Dto, ) {
        const result = await this.service_dp.update_driver_partner(update_driver_partner, driver_partner_id);

        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully updated driver partner',
            data: result,
        }
    }

    @Delete(':driver_partner_id/soft-delete')
    @Roles()
    @HttpCode(HttpStatus.OK)
    @ApiResponse( delete_dp_response )
    @ApiResponse( unauthorized_role_response )
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBadRequestResponse(delete_dp_bad_request_response)
    async soft_delete_driver_partner(@Param('driver_partner_id', new ParseIntPipe()) driver_partner_id: number) {
        const driverPartner = await this.service_dp.soft_delete_driver_partner(driver_partner_id);

        if (!driverPartner){
            throw new NotFoundException("Payment Data Not Found!")
        }
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully deleted driver partner',
            data: driverPartner,
        }
    }

    @Delete(':driver_partner_id/permanent-delete')
    @Roles()
    @HttpCode(HttpStatus.OK)
    @ApiResponse( delete_dp_response )
    @ApiResponse( unauthorized_role_response )
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBadRequestResponse(delete_dp_bad_request_response)
    async permanent_delete_driver_partner(@Param('driver_partner_id', new ParseIntPipe()) driver_partner_id: number) {
        const driverPartner = await this.service_dp.permanent_delete_driver_partner(driver_partner_id);

        if (!driverPartner){
            throw new NotFoundException("Payment Data Not Found!")
        }
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully deleted driver partner',
            data: driverPartner,
        }
    }
}



/* eslint-disable prettier/prettier */

import { unauthorized_role_response, get_all_tax_response, get_tax_by_id_response, update_tax_response, create_tax_response, not_found_response, bad_request_response, unauthorized_response, delete_tax_response } from '../../tests/swagger/tax.swagger';
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Patch, Delete, Param, ParseIntPipe, Query} from '@nestjs/common';
import { has_role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { TaxService } from './tax.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaxDto, UpdateTaxDto } from './dto/tax.dto';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiTags, ApiNotFoundResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Taxes')
@Controller('tax')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class TaxController {
    constructor( private readonly tax_service: TaxService) {}

    @Get()
    @Roles()
    @ApiBearerAuth('JWT')
    @ApiResponse(get_all_tax_response)
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async findAllTaxes(@Query('page') page: number, @Query('limit') limit: number) {
        const result = await this.tax_service.findAllTaxes(page, limit);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all taxes',
            data: result,
        };
    }

    @Get('active')
    @Roles()
    @ApiBearerAuth('JWT')
    async activeTaxForOrder() {
        const result = await this.tax_service.taxDataForOrder();
        return {
            StatusCode: HttpStatus.OK,
            response: 'This tax details for order',
            data: result,
        };
    }

    @Get(':tax_id')
    @Roles()
    @ApiBearerAuth('JWT')
    @ApiResponse(get_tax_by_id_response)
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async findOneTax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const result = await this.tax_service.findOneTax(tax_id);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched tax by id',
            data: result,
        };
    }

    @Post()
    @Roles()
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth('JWT')
    @ApiResponse(create_tax_response)
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async createTax(@Body() create_tax_data: CreateTaxDto) {
        const result = await this.tax_service.createTax(create_tax_data);
        return {
            StatusCode: HttpStatus.CREATED,
            response: 'Successfully created tax',
            data: result,
        };
    }

    @Patch(':tax_id')
    @Roles()
    @ApiResponse(update_tax_response)
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    @ApiBearerAuth('JWT')
    async updateTax(
        @Param('tax_id', ParseIntPipe) tax_id: number, 
        @Body() update_tax_data: UpdateTaxDto) {
        const result = await this.tax_service.updateTax(tax_id, update_tax_data);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully updated tax',
            data: result,
        };
    }

    @Delete(':tax_id')
    @Roles()
    @ApiBearerAuth('JWT')
    @ApiResponse(delete_tax_response)
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async deleteTax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const result = await this.tax_service.deleteTax(tax_id);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully deleted tax',
            data: result,
        };
    }



}

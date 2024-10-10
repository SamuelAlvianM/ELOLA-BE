
/* eslint-disable prettier/prettier */

import { unauthorized_role_response, get_all_tax_response, get_tax_by_id_response, update_tax_response, create_tax_response, not_found_response, bad_request_response, unauthorized_response, delete_tax_response } from '../../tests/swagger/tax.swagger';
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Patch, Delete, Param, ParseIntPipe, Query} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { TaxService } from './tax.service';
import { Create_Tax_Dto, Update_Tax_Dto } from './dto/tax.dto';
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
    async get_all_taxes(@Query('page') page: number, @Query('limit') limit: number) {
        const result = await this.tax_service.find_all_taxes(page, limit);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all taxes',
            data: result,
        };
    }

    @Get('active')
    @Roles()
    @ApiBearerAuth('JWT')
    async active_tax_for_order() {
        const result = await this.tax_service.tax_data_for_order();
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
    async find_one_tax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const result = await this.tax_service.find_one_tax(tax_id);
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
    async create_new_tax(@Body() create_tax_data: Create_Tax_Dto) {
        const result = await this.tax_service.create_new_tax(create_tax_data);
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
    async update_tax(
        @Param('tax_id', ParseIntPipe) tax_id: number, 
        @Body() update_tax_data: Update_Tax_Dto) {
        const result = await this.tax_service.update_tax_data(tax_id, update_tax_data);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully updated tax',
            data: result,
        };
    }

    @Patch(':tax_id')
    async soft_delete_tax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const soft_delete_data = await this.tax_service.soft_delete_tax(tax_id);

        return {
            status: HttpStatus.OK,
            message: 'Data Successfully moved to bin / deleted',
            data: soft_delete_data,
        }
    }

    @Delete(':tax_id')
    @Roles()
    @ApiBearerAuth('JWT')
    @ApiResponse(delete_tax_response)
    @ApiResponse( unauthorized_role_response )
    @ApiNotFoundResponse(not_found_response)
    @ApiBadRequestResponse(bad_request_response)
    @ApiUnauthorizedResponse(unauthorized_response)
    async permanent_delete_tax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const permanent_delete_data = await this.tax_service.permanent_delete_tax(tax_id);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Data Successfully deleted PERMANENTLY',
            data: permanent_delete_data,
        };
    }



}

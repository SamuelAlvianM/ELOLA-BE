/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Patch, Delete, Param, ParseIntPipe} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { User } from 'src/utils/decorator/user.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { TaxService } from './tax.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaxDto, UpdateTaxDto } from './dto/tax.dto';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Taxes')
@Controller('tax')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaxController {
    constructor( private readonly tax_service: TaxService) {}

    @Get()
    @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT')
    @ApiResponse({status: 200, description: 'Successfully fetched all taxes'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findAllTaxes() {
        const result = await this.tax_service.findAllTaxes();
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched all taxes',
            data: result,
        };
    }

    @Get(':tax_id')
    @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT')
    @ApiResponse({status: 200, description: 'Successfully fetched tax'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async findOneTax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const result = await this.tax_service.findOneTax(tax_id);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully fetched tax',
            data: result,
        };
    }

    @Post()
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth('JWT')
    @ApiResponse({status: 201, description: 'Successfully created tax'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async createTax(@Body() create_tax_data: CreateTaxDto) {
        const result = await this.tax_service.createTax(create_tax_data);
        return {
            StatusCode: HttpStatus.CREATED,
            response: 'Successfully created tax',
            data: result,
        };
    }

    @Patch(':tax_id')
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: 200, description: 'Successfully updated tax'})
    @ApiUnauthorizedResponse({status: 401, description: 'Unauthorized'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
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
    @Roles(Role.SUPER_ADMIN, Role.OWNER)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('JWT')
    @ApiResponse({status: 200, description: 'Successfully deleted tax'})
    @ApiUnauthorizedResponse({status: 401, description: 'Unauthorized'})
    @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
    async deleteTax(@Param('tax_id', ParseIntPipe) tax_id: number) {
        const result = await this.tax_service.deleteTax(tax_id);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Successfully deleted tax',
            data: result,
        };
    }



}

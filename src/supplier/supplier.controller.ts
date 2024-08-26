/* eslint-disable prettier/prettier */
import {unauthorized_role_response, get_all_suppliers_response, get_all_suppliers_bad_request_response, create_supplier_response, create_supplier_bad_request_response, get_supplier_id_response, get_supplier_id_bad_req_response, delete_supplier_response, delete_supplier_bad_req_response, update_supplier_response, update_supplier_bad_req_response, unauthorized_response} from '../../tests/swagger/supplier.swagger';
import { Controller, Get, Post, Body, Param, Query, ParseEnumPipe, Delete, UseGuards, Put, HttpCode, HttpStatus, ParseIntPipe, Patch} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';
import {Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( create_supplier_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(create_supplier_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    const create_supplier = await this.supplierService.createSupplier(createSupplierDto);
    return {
      status: HttpStatus.CREATED,
      message: 'Supplier data created successfully',
      data: create_supplier,
    };
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_all_suppliers_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(get_all_suppliers_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async getAllSuppliers(@Query('page') page: number, @Query('limit') limit: number) {
    const get_all_suppliers = await this.supplierService.getAllSuppliers(page, limit);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data fetched successfully',
      data: get_all_suppliers,
    };
  }



  @Get('supplier/:supplier_id')
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_supplier_id_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(get_supplier_id_bad_req_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async findBySupplierId(@Param('supplier_id', ParseIntPipe) supplier_id: number) {
    const get_id_result = await this.supplierService.findBySupplierId(supplier_id);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data fetched successfully',
      data: get_id_result,
    };
  }

  @Delete('supplier/:supplier_id')
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse( delete_supplier_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(delete_supplier_bad_req_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async deleteBySupplierId(@Param('supplier_id', ParseIntPipe) supplier_id: number) {
    const result_delete = await this.supplierService.deleteBySupplierId(supplier_id);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data deleted successfully',
      data: result_delete,
    };
  }

  @Put('supplier/:supplier_id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( update_supplier_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(update_supplier_bad_req_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async updateBySupplierId(
    @Param('supplier_id', ParseIntPipe) supplier_id: number,
    @Body() update_dto: UpdateSupplierDto,
  ) {
    const result = await this.supplierService.updateSupplier(supplier_id, update_dto);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data updated successfully',
      data: result,
    };
  }
}

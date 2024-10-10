/* eslint-disable prettier/prettier */
import {unauthorized_role_response, get_all_suppliers_response, get_all_suppliers_bad_request_response, create_supplier_response, create_supplier_bad_request_response, get_supplier_id_response, get_supplier_id_bad_req_response, delete_supplier_response, delete_supplier_bad_req_response, update_supplier_response, update_supplier_bad_req_response, unauthorized_response} from '../../tests/swagger/supplier.swagger';
import { Controller, Get, Post, Body, Param, Query, ParseEnumPipe, Delete, UseGuards, Put, HttpCode, HttpStatus, ParseIntPipe, Patch} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Create_Supplier_Dto, Update_Supplier_Dto } from './dto/supplier.dto';
import {has_role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplier_service: SupplierService) {}

  @Post()
  @Roles()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( create_supplier_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(create_supplier_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async create_new_supplier(@Body() create_supplier: Create_Supplier_Dto) {
    const create_new_supplier = await this.supplier_service.create_new_supplier(create_supplier);
    return {
      status: HttpStatus.CREATED,
      message: 'Supplier data created successfully',
      data: create_new_supplier,
    };
  }

  @Get()
  @Roles()
  @UseGuards(JwtAuthGuard, )
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_all_suppliers_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(get_all_suppliers_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async get_all_supplier(@Query('page') page: number, @Query('limit') limit: number) {
    const get_all_suppliers = await this.supplier_service.find_all_suppliers(page, limit);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data fetched successfully',
      data: get_all_suppliers,
    };
  }



  @Get('supplier/:supplier_id')
  @Roles()
  @UseGuards(JwtAuthGuard,)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_supplier_id_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(get_supplier_id_bad_req_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async get_supplier_by_id(@Param('supplier_id', ParseIntPipe) supplier_id: number) {
    const get_id_result = await this.supplier_service.find_one_supplier(supplier_id);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data fetched successfully',
      data: get_id_result,
    };
  }
  
  @Put('supplier/:supplier_id')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard,)
  @Roles()
  @ApiResponse( update_supplier_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(update_supplier_bad_req_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async update_supplier(
    @Param('supplier_id', ParseIntPipe) supplier_id: number,
    @Body() update_dto: Update_Supplier_Dto,
  ) {
    const result = await this.supplier_service.update_data_supplier(supplier_id, update_dto);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data updated successfully',
      data: result,
    };
  }

  @Patch('supplier/:supplier_id')
  @Roles()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse( delete_supplier_response )
  @ApiResponse( unauthorized_role_response )
  @ApiBadRequestResponse(delete_supplier_bad_req_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async soft_delete_supplier(@Param('supplier_id', ParseIntPipe) supplier_id: number) {
    const deleted_data = await this.supplier_service.soft_delete_supplier(supplier_id);
    return {
      status: HttpStatus.OK,
      message: 'Supplier data deleted successfully',
      data: deleted_data,
    };
  }

  @Delete()
  async permanent_delete_supplier(@Param('supplier_id', ParseIntPipe) supplier_id: number) {
    const delete_permanent_data = await this.supplier_service.permanent_delete_supplier(supplier_id);

    return{
      status: HttpStatus.OK,
      message: 'Supplier data deleted successfully - PERMANENT',
      data: delete_permanent_data,
    };
  }

}

/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Query, ParseEnumPipe, Delete, Put, HttpCode, HttpStatus} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/supplier.dto';
import { Order_type, Order_payment_type, Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Successfully Created'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Supplier Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get('supplier/:supplier_id')
  findBySupplierId(@Param('supplier_id') supplier_id: number) {
    return this.supplierService.findBySupplierId(supplier_id);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Supplier Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Delete('supplier/:supplier_id')
  deleteBySupplierId(@Param('supplier_id') supplier_id: number) {
    return this.supplierService.deleteBySupplierId(supplier_id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Update Data Supplier Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data!'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Put('supplier/:supplier_id')
  updateBySupplierId(
    @Param('supplier_id') supplier_id: number,
    @Body() createSupplierDto: CreateSupplierDto,
  ) {
    return this.supplierService.createSupplier({
      ...createSupplierDto,
      supplier_id,
    });
  }
}

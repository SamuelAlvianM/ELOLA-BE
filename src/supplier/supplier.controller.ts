import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseEnumPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/supplier.dto';
import { Order_type, Order_payment_type } from '@prisma/client';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Get('supplier/:supplier_id')
  findBySupplierId(@Param('supplier_id') supplier_id: number) {
    return this.supplierService.findBySupplierId(supplier_id);
  }

  @Delete('supplier/:supplier_id')
  deleteBySupplierId(@Param('supplier_id') supplier_id: number) {
    return this.supplierService.deleteBySupplierId(supplier_id);
  }

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

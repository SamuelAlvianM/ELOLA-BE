/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto } from './dto/supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async createSupplier(data: CreateSupplierDto) {
    return this.prisma.supplier.create({ data });
  }

  async findBySupplierId(supplier_id: number) {
    return this.prisma.supplier.findFirst({ 
      where: { supplier_id, deleted_at: null } });
  }

  async deleteBySupplierId(supplier_id: number) {
    return this.prisma.supplier.update({
      where: { supplier_id },
      data: {
        deleted_at: new Date(),
      },
    });
  }
  
}

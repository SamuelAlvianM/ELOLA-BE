/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto/supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async createSupplier(supplier_dto: CreateSupplierDto) {

    const existingSupplier = await this.prisma.supplier.findFirst({
      where: { supplier_name: supplier_dto.supplier_name },
    })

    if(existingSupplier) {
      throw new Error(`Supplier ${supplier_dto.supplier_name} already exists`);
    }

    return this.prisma.supplier.create({ 
      data: {...supplier_dto},
    });
  }
  
  async getAllSuppliers() {
    return this.prisma.supplier.findMany({
      where: { deleted_at: null },
    });
  }

  async findBySupplierId(supplier_id: number) {
    return this.prisma.supplier.findFirst({ 
      where: { supplier_id, deleted_at: null } });
  }

  async updateSupplier(supplier_id: number, supplier_dto: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      where: { supplier_id },
      data: {...supplier_dto},
    });
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

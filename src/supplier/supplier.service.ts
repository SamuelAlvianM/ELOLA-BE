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

  async getAllSuppliers(page: number, limit: number) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;
    const [suppliers, totalCount] = await this.prisma.$transaction([
      this.prisma.supplier.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normalLimit,
      }),
      this.prisma.supplier.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      data: suppliers,
      meta: {
        "Current Page": page,
        "Items per Page": normalLimit,
        "Total Pages": Math.ceil(totalCount / limit),
        "Total Items": totalCount,
      },
    };
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

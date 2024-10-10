/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Supplier_Dto, Update_Supplier_Dto } from './dto/supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create_new_supplier(supplier_dto: Create_Supplier_Dto) {
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

  async find_all_suppliers(page: number, limit: number) {
    const max_limit = 10;
    const normal_limit = Math.min(limit, max_limit)
    const skip = (page - 1) * normal_limit;
    const [suppliers, total] = await this.prisma.$transaction([
      this.prisma.supplier.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normal_limit,
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
        current_page: page,
        items_per_page: normal_limit,
        total_pages: Math.ceil(total / normal_limit ),
        total_items: total,
      },
    };
  }

  async find_one_supplier(supplier_id: number) {
    return this.prisma.supplier.findFirst({ 
      where: { supplier_id, deleted_at: null } });
  }

  async update_data_supplier(supplier_id: number, supplier_dto: Update_Supplier_Dto) {
    return this.prisma.supplier.update({
      where: { supplier_id },
      data: {...supplier_dto},
    });
  }

  async soft_delete_supplier(supplier_id: number) {
    const check_supplier_data = await this.prisma.supplier.findUnique({ where: { supplier_id}});

    if(!check_supplier_data || check_supplier_data.is_deleted ) {
      throw new NotFoundException(`Supplier ${supplier_id} not found `)
    }
    
    return this.prisma.supplier.update({
      where: { supplier_id },
      data: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  async permanent_delete_supplier(supplier_id: number) {
    const check_supplier_data = await this.prisma.supplier.findUnique({ where: {supplier_id}});

    if(!check_supplier_data || check_supplier_data.is_deleted ) {
      throw new NotFoundException(`Supplier ${supplier_id} not found`);
    }

     return await this.prisma.supplier.delete({where: {supplier_id}});
  }
  
}

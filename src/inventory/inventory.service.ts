/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { Inventory } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return this.prisma.inventory.create({
      data: {
        ...createInventoryDto,
        in_storage_date: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.inventory.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.inventory.findUnique({
      where: { 
        inventory_id: id, 
        deleted_at: null 
      },
    });
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.prisma.inventory.update({
      where: { 
        inventory_id: id 
      },
      data: {
        ...updateInventoryDto,
        out_storage_date: new Date(),
      }
    });
  }

  async softDeleteInventory(inventory_id: number): Promise<Inventory> {
    return this.prisma.inventory.update({
      where: {
        inventory_id
      },
      data: {
        deleted_at: new Date()
      }
    })
  }
}
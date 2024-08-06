/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getAllInventory(): Promise<Inventory[]> {
    return this.prisma.inventory.findMany({
      where: {
        deleted_at: null
      }
    })
  }

  async getInventoryById(inventory_id: number): Promise<Inventory> {
    const inventory = await this.prisma.inventory.findFirst({
      where: {
        inventory_id,
        deleted_at: null,
      },
    });

    if (!inventory) {
      throw new NotFoundException(`Payment with ID ${inventory_id} not found or has been deleted.`);
    }

    return inventory;
  }

  async updateInventory(inventory_id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.prisma.inventory.update({
      where: { inventory_id },
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
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { inventory } from '@prisma/client';

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


  async getAllInvetory(page: number, limit: number) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;
    const [inventories, totalCount] = await this.prisma.$transaction([
      this.prisma.inventory.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normalLimit,
      }),
      this.prisma.inventory.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      data: inventories,
      meta: {
        currentPage: page,
        itemsPerPage: normalLimit,
        totalPages: Math.ceil(totalCount / normalLimit ),
        totalItems: totalCount,
      },
    };
  }

  async getInventoryById(inventory_id: number): Promise<inventory> {
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

  async softDeleteInventory(inventory_id: number): Promise<inventory> {
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
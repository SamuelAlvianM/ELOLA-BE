/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/inventory.dto';
import { UpdateInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInventoryDto: CreateInventoryDto) {
    return this.prisma.inventory.create({ data: createInventoryDto });
  }

  async findAll() {
    return this.prisma.inventory.findMany();
  }

  async findOne(id: number) {
    return this.prisma.inventory.findUnique({ where: { inventory_id: id } });
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return this.prisma.inventory.update({
      where: { inventory_id: id },
      data: updateInventoryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.inventory.delete({ where: { inventory_id: id } });
  }
}
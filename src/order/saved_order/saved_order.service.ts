import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SavedOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createSavedOrder(order_id: number) {
    const existingOrder = await this.prisma.savedOrder.findFirst({
      where: { order_id },
    });

    if (!existingOrder) {
      await this.prisma.savedOrder.create({
        data: {
          order_id,
          status: 'NOT PAID',
        },
      });
    }
  }

  async updateSavedOrderToPaid(order_id: number) {
    return this.prisma.savedOrder.updateMany({
      where: {
        order_id,
        status: 'NOT PAID',
      },
      data: {
        status: 'PAID',
      },
    });
  }

  async getSavedOrder(order_id: number) {
    const savedOrder = await this.prisma.savedOrder.findFirst({
      where: { order_id },
      include: {
        order: true, 
        items: {
          include: {
            product: true,
            tax: true,
          },
        },
        transaction: true,
      },
    });

    if (!savedOrder) {
      throw new NotFoundException('Saved order not found');
    }

    return savedOrder;
  }

  async softDeleteSavedOrder(saved_order_id: number) {
    const existingSavedOrder = await this.prisma.savedOrder.findUnique({
      where: { saved_order_id },
    });

    if (!existingSavedOrder) {
      throw new NotFoundException('Saved Order not found');
    }

    return this.prisma.savedOrder.update({
      where: { saved_order_id },
      data: { deleted_at: new Date() },
    });
  }
}
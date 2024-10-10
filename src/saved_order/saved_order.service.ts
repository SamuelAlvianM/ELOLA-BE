import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { saved_order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavedOrderService {
  constructor(private prisma: PrismaService) {}

  async get_saved_order(saved_order_id: number): Promise<saved_order | null> {
    return this.prisma.saved_order.findUnique({
      where: { saved_order_id },
      include: { orders: true, order_products: true },
    });
  }

  async update_saved_order(saved_order_id: number, data: Partial<saved_order>): Promise<saved_order> {
    return this.prisma.saved_order.update({
      where: { saved_order_id },
      data,
    });
  }

  async mark_as_served(saved_order_id: number): Promise<saved_order> {
    return this.prisma.saved_order.update({
      where: { saved_order_id },
      data: {
        is_done: true,
        status: 'COMPLETED',
      },
    });
  }

  async get_all_saved_orders(filters?: Partial<saved_order>): Promise<saved_order[]> {
    return this.prisma.saved_order.findMany({
      where: filters,
      include: { orders: true, order_products: true },
    });
  }

  async deleted_save_order(saved_order_id: number) {
    try {
      return await this.prisma.saved_order.update({
        where: { saved_order_id: saved_order_id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete saved order.');
    }
  }
}

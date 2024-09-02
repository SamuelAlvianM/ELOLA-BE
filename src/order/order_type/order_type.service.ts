import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order-type.dto';
import { SavedOrderService } from '../saved_order/saved_order.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly savedOrderService: SavedOrderService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, store_id: number, user_id: number) {
    const order = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        store_id,
        user_id,
      },
    });

    await this.savedOrderService.createSavedOrder(order.order_id);
    return order;
  }

  

  async getOrders(store_id: number, user_id: number, page: number, limit: number) {

    const maxLimit = 20;
    const currentLimit = Math.min(limit, maxLimit);
    const skip = (page - 1) * currentLimit;
    const [ order, total ] = await this.prisma.$transaction([

      this.prisma.order.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: currentLimit,
      }),
      this.prisma.order.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      data: order,
      meta: {
        "Current Page": page,
        "Items per Page": currentLimit,
        "Total Pages": Math.ceil(total / limit),
        "Total Items": total,
      },
    };
  }

  async getOrderById(id: number, store_id: number, user_id: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        order_id: id,
        store_id,
        user_id,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto, store_id: number, user_id: number) {
    const existingOrder = await this.prisma.order.findFirst({
      where: {
        order_id: id,
        store_id,
        user_id,
      },
    });
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }
    return this.prisma.order.update({
      where: { order_id: id },
      data: {
        ...updateOrderDto,
        store_id,
        user_id,
      },
    });
  }

  async softDeleteOrder(id: number, store_id: number, user_id: number) {
    const existingOrder = await this.prisma.order.findFirst({
      where: {
        order_id: id,
        store_id,
        user_id,
      },
    });
    if (!existingOrder) {
      throw new NotFoundException('Order not found');
    }
    return this.prisma.order.update({
      where: { order_id: id },
      data: {
        deleted_at: new Date(),
        store_id,
        user_id,
      },
    });
  }
}

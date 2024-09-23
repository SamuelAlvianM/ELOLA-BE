import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavedOrderService {
  constructor(private prisma: PrismaService) {}

  async createSavedOrder(transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { transaction_id: transactionId },
      include: { 
        products: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('transaction not found')
    }
    
    try {
      return await this.prisma.saved_order.create({
        data: {
          transaction_id: transaction.transaction_id,
          is_done: false,
          status: 'Not Paid', 
          transaction_products: {
            create: transaction.products.map(product => ({
              transaction_id: product.transaction_id,
              product_id: product.product_id,
              quantity: product.quantity,
            })),
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create saved order.');
    }
  }

  async findAllSavedOrders(page: number, limit: number) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit);
    const skip = (page - 1) * normalLimit;

    const [savedOrders, totalCount] = await this.prisma.$transaction([
      this.prisma.saved_order.findMany({
        skip: skip,
        take: normalLimit,
      }),
      this.prisma.saved_order.count(),
    ]);

    return {
      savedOrders,
      meta: {
        currentPage: page,
        itemsPerPage: normalLimit,
        totalPages: Math.ceil(totalCount / normalLimit),
        totalItems: totalCount,
      },
    };
  }

  async findOneSavedOrder(id: number) {
    const savedOrder = await this.prisma.saved_order.findUnique({
      where: { saved_order_id: id },
    });
    if (!savedOrder) {
      throw new NotFoundException('Saved order not found.');
    }
    return savedOrder;
  }

  async updateSavedOrder(id: number, updateSavedOrderDto: { is_done?: boolean; status?: string }) {
    try {
      return await this.prisma.saved_order.update({
        where: { saved_order_id: id },
        data: updateSavedOrderDto,
      });
    } catch (error) {
      throw new BadRequestException('Failed to update saved order.');
    }
  }

  async deleteSavedOrder(id: number) {
    try {
      return await this.prisma.saved_order.update({
        where: { saved_order_id: id },
        data: { deleted_at: new Date() },
      });
    } catch (error) {
      throw new BadRequestException('Failed to delete saved order.');
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SavedOrderService } from '../saved_order/saved_order.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly savedOrderService: SavedOrderService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto, order_id: number, item_id: number) {
    const order = await this.prisma.order.findUnique({
      where: { order_id },
    });

    if (!order) {
      throw new NotFoundException(`Order ${order_id} not found`);
    }

    const item = await this.prisma.items.findUnique({
      where: { item_id },
    });

    if (!item) {
      throw new NotFoundException(`Item ${item_id} not found`);
    }

    const grandTotal: bigint = BigInt(item.sub_total);
    const amountPaid: bigint = BigInt(createTransactionDto.amount_paid);
    const change: bigint = amountPaid - grandTotal;

    const transaction = await this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        order_id,
        item_id,
        grand_total: grandTotal,
        change: change > 0n ? change : 0n,
      },
      include: {
        order: true,
        item: true,
      },
    });

    await this.savedOrderService.updateSavedOrderToPaid(order_id);
    return transaction;
  }


  async getTransactionById(transaction_id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { transaction_id },
      include: {
        order: true,
        item: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async updateTransaction(transaction_id: number, updateTransactionDto: UpdateTransactionDto) {
    const existingTransaction = await this.prisma.transaction.findUnique({
      where: { transaction_id },
    });

    if (!existingTransaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transaction.update({
      where: { transaction_id },
      data: updateTransactionDto,
      include: {
        order: true,
        item: true,
      },
    });
  }

  async deleteTransaction(transaction_id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { transaction_id },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transaction.delete({
      where: { transaction_id },
    });
  }
}

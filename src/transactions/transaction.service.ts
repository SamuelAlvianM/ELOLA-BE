import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { DateRangeDto } from './dto/dateRange.dto';
import { Order_payment_type } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data,
    });
  }

  async findByStoreId(store_id: number) {
    return this.prisma.transaction.findMany({
      where: { store_id },
    });
  }

  async findByPaymentType(payment_type: Order_payment_type) {
    return this.prisma.transaction.findMany({
      where: { payment_type },
    });
  }

  async findByDateRange({ startDate, endDate }: DateRangeDto) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);

    return this.prisma.transaction.findMany({
      where: {
        created_at: {
          gte: start,
          lt: end,
        },
      },
    });
  }
}

/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto, store_id: number, user_id: number) {
    const { order_type, products, quantity, payment_type, customer_name, whatsapp_number, sub_total, grand_total, change } = createTransactionDto;

    // Check if the cashier is open and get the user ID from the open session
    // const openClose = await this.openCloseService.getOpenSessionForStore(store_id);
    // if (!openClose || !openClose.is_cashier_open) {
    //   throw new BadRequestException('No open cashier session found for this store.');
    // }

    const current_user = await this.userService.getCurrentUser(user_id);
    const current_user_id = current_user.user_id;

    // Generate receipt number
    const receipt_prefix = order_type === 'Order' ? 'DI' : 'TA';
    const lastTransaction = await this.prisma.transaction.findFirst({
      where: { store_id },
      orderBy: { receipt_number: 'desc' },
    });

    const receipt_number = lastTransaction
      ? `${receipt_prefix}${(parseInt(lastTransaction.receipt_number.substring(2)) + 1).toString().padStart(4, '0')}`
      : `${receipt_prefix}0001`;

      const active_tax = await this.prisma.tax.findMany({
        where: { tax_status: true },
      })

      if (active_tax.length === 0) {
        throw new BadRequestException('No active tax found.');
      }

    // Create the transaction
    const transaction = await this.prisma.transaction.create({
      data: {
        store_id,
        user_id: current_user_id,
        order_type,
        receipt_number,
        sub_total,
        tax_id:  active_tax[0].tax_id,
        grand_total,
        quantity,
        payment_type,
        change,
        customer_name: customer_name || null,
        whatsapp_number: whatsapp_number || null,
        products: {
          create: products.map(product => ({
            product_id: product.product_id,
            quantity: product.quantity,
          })),
      },
    }
    });

    return transaction;
  }

  // async findAllTransactions() {
  //   return this.prisma.transaction.findMany();
  // }

  async findAllTransactions(page: number, limit: number) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;
    
    const [transactions, totalCount] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normalLimit,
      }),
      this.prisma.transaction.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      transactions,
      meta: {
        currentPage: page,
        itemsPerPage: normalLimit,
        totalPages: Math.ceil(totalCount / normalLimit ),
        totalItems: totalCount,
      },
    };
  }

  async findTransactionById(transaction_id: number) {
    const transaction = await this.prisma.transaction.findUnique({ where: { transaction_id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transaction_id} not found`);
    }
    return transaction;
  }

  async updateTransaction(transaction_id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { transaction_id },
      data: updateTransactionDto,
    });
  }

  async deleteTransaction(transaction_id: number) {
    const transaction = await this.prisma.transaction.findUnique({ where: { transaction_id } });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${transaction_id} not found`);
    }
    return this.prisma.transaction.delete({ where: { transaction_id } });
  }
}

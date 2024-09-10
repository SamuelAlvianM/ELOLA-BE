import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { OpenCloseService } from '../open_close/open_close.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openCloseService: OpenCloseService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto, store_id: number) {
    const { order_type, product_id, quantity, payment_type, customer_name, whatsapp_number, sub_total, tax_id, grand_total, change } = createTransactionDto;

    // Check if the cashier is open and get the user ID from the open session
    const openClose = await this.openCloseService.getOpenSessionForStore(store_id);
    if (!openClose || !openClose.is_cashier_open) {
      throw new BadRequestException('No open cashier session found for this store.');
    }

    const user_id = openClose.user_id;

    // Generate receipt number
    const receipt_prefix = order_type === 'Order' ? 'DI' : 'TA';
    const lastTransaction = await this.prisma.transaction.findFirst({
      where: { store_id },
      orderBy: { receipt_number: 'desc' },
    });

    const receipt_number = lastTransaction
      ? `${receipt_prefix}${(parseInt(lastTransaction.receipt_number.substring(2)) + 1).toString().padStart(4, '0')}`
      : `${receipt_prefix}0001`;

    // Create the transaction
    const transaction = await this.prisma.transaction.create({
      data: {
        store_id,
        user_id,
        order_type,
        receipt_number,
        sub_total,
        tax_id,
        grand_total,
        product_id,
        quantity,
        payment_type,
        change,
        customer_name: customer_name || null,
        whatsapp_number: whatsapp_number || null,
      },
    });

    return transaction;
  }

  async findAllTransactions() {
    return this.prisma.transaction.findMany();
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

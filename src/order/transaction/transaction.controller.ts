import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { JwtAuthGuard } from '../../utils/guard/jwt.guard';
import { RolesGuard } from '../../utils/guard/roles.guard';
import { Roles } from '../../utils/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('orders/:order_id/items/:item_id/transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('JWT')
  async createTransaction(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Param('item_id', ParseIntPipe) item_id: number,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    const transaction = await this.transactionService.createTransaction(createTransactionDto, order_id, item_id);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transaction created successfully!',
      data: transaction,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @Get(':transaction_id')
  @ApiBearerAuth('JWT')
  async getTransactionById(
    @Param('transaction_id', ParseIntPipe) transaction_id: number
  ) {
    const transaction = await this.transactionService.getTransactionById(transaction_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaction retrieved successfully!',
      data: transaction,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Patch(':transaction_id')
  @ApiBearerAuth('JWT')
  async updateTransaction(
    @Param('transaction_id', ParseIntPipe) transaction_id: number,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    const transaction = await this.transactionService.updateTransaction(transaction_id, updateTransactionDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaction updated successfully!',
      data: transaction,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Delete(':transaction_id')
  @ApiBearerAuth('JWT')
  async deleteTransaction(
    @Param('transaction_id', ParseIntPipe) transaction_id: number
  ) {
    await this.transactionService.deleteTransaction(transaction_id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Transaction deleted successfully!',
    };
  }
}

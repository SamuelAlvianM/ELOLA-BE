/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto/transaction.dto';
import { has_role } from '@prisma/client';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class TransactionController {
  // constructor(private readonly transactionService: TransactionService) {}

  // @Post()
  // @Roles()
  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponse({ status: HttpStatus.CREATED, description: 'Transaction created successfully.' })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  // @ApiBearerAuth('JWT')
  // async createTransaction(
  //   @Body() createTransactionDto: CreateTransactionDto,
  //   @Query('store_id', ParseIntPipe) store_id: number,
  //   @Query('user_id', ParseIntPipe) user_id: number,
  // ) {
  //   console.log(store_id, user_id);
  //   const transaction = await this.transactionService.createTransaction(createTransactionDto, store_id, user_id);
  //   return {
  //     message: 'Transaction created successfully!',
  //     data: transaction,
  //   };
  // }

  // @Roles()
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({ status: HttpStatus.OK, description: 'Fetch all transactions.' })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  // @ApiBearerAuth('JWT')
  // @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  // @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  // @Get()
  // async getAllTransactions(@Query('page') page: number, @Query('limit') limit: number) {
  //   const transactions = await this.transactionService.findAllTransactions(page, limit);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Fetch all transactions successfully.',
  //     data: transactions,
  //   };
  // }

  // @Roles()
  // @HttpCode(HttpStatus.OK)
  // @ApiResponse({ status: HttpStatus.OK, description: 'Fetch transaction by ID.' })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transaction not found' })
  // @ApiBearerAuth('JWT')
  // @Get(':transaction_id')
  // async getTransactionById(@Param('transaction_id', ParseIntPipe) transaction_id: number) {
  //   const transaction = await this.transactionService.findTransactionById(transaction_id);
  //   return {
  //     message: 'Fetch transaction successfully.',
  //     data: transaction,
  //   };
  // }

  // @Roles()
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Transaction updated successfully.' })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  // @ApiBearerAuth('JWT')
  // @Patch(':transaction_id')
  // async updateTransaction(@Query('transaction_id', ParseIntPipe) transaction_id: number, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   const updatedTransaction = await this.transactionService.updateTransaction(transaction_id, updateTransactionDto);
  //   return {
  //     message: 'Transaction updated successfully!',
  //     data: updatedTransaction,
  //   };
  // }

  // @Roles()
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Transaction deleted successfully.' })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Transaction not found' })
  // @ApiBearerAuth('JWT')
  // @Delete(':transaction_id')
  // async deleteTransaction(@Query('transaction_id', ParseIntPipe) transaction_id: number) {
  //   const transaction = await this.transactionService.deleteTransaction(transaction_id);
  //   return {
  //     statusCode: HttpStatus.NO_CONTENT,
  //     message: 'Transaction deleted successfully!',
  //     data: transaction,
  //   };
  // }
}

/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseEnumPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { DateRangeDto } from './dto/dateRange.dto';
import { Order_payment_type } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Successfully Created Transaction Data!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get('store/:store_id')
  findByStoreId(@Param('store_id') store_id: number) {
    return this.transactionService.findByStoreId(store_id);
  }

  @Get('payment/:payment_type')
  findByPaymentType(
    @Param('payment_type', new ParseEnumPipe(Order_payment_type))
    payment_type: Order_payment_type,
  ) {
    return this.transactionService.findByPaymentType(payment_type);
  }

  @Get('date-range')
  findByDateRange(@Query() dateRangeDto: DateRangeDto) {
    return this.transactionService.findByDateRange(dateRangeDto);
  }
}

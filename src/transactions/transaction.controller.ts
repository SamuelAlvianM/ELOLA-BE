/* eslint-disable prettier/prettier */
import { 
  create_transaction_response,
  create_transaction_bad_request_response,
  create_transaction_unauthorized_response,
  find_by_store_id_response,
  find_by_store_id_bad_request_response,
  find_by_payment_type_response,
  find_by_payment_type_bad_request_response,
  find_by_date_range_response,
  find_by_date_range_bad_request_response,
  forbidden_role_response,
  unauthorized_response
} from '../../tests/swagger/transaction.swagger';
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
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { DateRangeDto } from './dto/dateRange.dto';
import { Order_payment_type, Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse(create_transaction_response)
  @ApiResponse(forbidden_role_response)
  @ApiBadRequestResponse(create_transaction_bad_request_response)
  @ApiUnauthorizedResponse(create_transaction_unauthorized_response)
  @ApiBearerAuth('JWT')
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get('store/:store_id')
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @ApiResponse(find_by_store_id_response)
  @ApiResponse(forbidden_role_response)
  @ApiBadRequestResponse(find_by_store_id_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  findByStoreId(@Param('store_id') store_id: number) {
    return this.transactionService.findByStoreId(store_id);
  }

  @Get('payment/:payment_type')
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @ApiResponse(find_by_payment_type_response)
  @ApiResponse(forbidden_role_response)
  @ApiBadRequestResponse(find_by_payment_type_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  findByPaymentType(
    @Param('payment_type', new ParseEnumPipe(Order_payment_type))
    payment_type: Order_payment_type,
  ) {
    return this.transactionService.findByPaymentType(payment_type);
  }

  @Get('date-range')
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @ApiResponse(find_by_date_range_response)
  @ApiResponse(forbidden_role_response)
  @ApiBadRequestResponse(find_by_date_range_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  findByDateRange(@Query() dateRangeDto: DateRangeDto) {
    return this.transactionService.findByDateRange(dateRangeDto);
  }
}

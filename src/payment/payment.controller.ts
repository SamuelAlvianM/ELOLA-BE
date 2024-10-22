/* eslint-disable prettier/prettier */
import { unauthorized_response, unauthorized_role_response, get_Payment_by_id_bad_request_response, get_Payment_by_id_response, get_all_payments_bad_request_response, get_all_payments_response, create_Payment_bad_request_response, create_Payment_response, update_Payment_bad_request_response, update_Payment_response, delete_Payment_bad_request_response, delete_Payment_response } from '../../tests/swagger/payment.swagger';
import { Controller, Get, Post, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {Create_Payment_Dto, Update_Payment_Dto } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { payment, has_role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class PaymentController {
  constructor(private readonly payment_service: PaymentService) {}

  @Roles()
  @Post()
  @ApiResponse( unauthorized_response )
  @ApiResponse( create_Payment_response)
  @ApiBadRequestResponse(create_Payment_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_role_response)
  async create_new_data(@Body() create_data: Create_Payment_Dto) {
    try {
      return {
        status: HttpStatus.OK,
        message: 'New payment Data Successfully created.',
        data: await this.payment_service.create_payment(create_data)
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create payment');
    }
  }

  @Roles()
  @ApiResponse( unauthorized_response )
  @ApiResponse( get_Payment_by_id_response)
  @ApiBadRequestResponse(get_all_payments_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_role_response)
  @Get(':payment_id')
  async find_pyment_by_id(@Param('payment_id', ParseIntPipe) payment_id: number) {
    return {
      status: HttpStatus.OK,
      message: 'Success get data Payment by id',
      data: await this.payment_service.get_payment_by_id(payment_id),
    };
  }

  @Roles()
  @ApiResponse( unauthorized_response )
  @ApiResponse( get_all_payments_response)
  @ApiBadRequestResponse(get_Payment_by_id_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_role_response)
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @Get()
  async find_all_payment_data(@Query('page') page: number, @Query('limit') limit: number) {
    return {
      status: HttpStatus.OK,
      message: 'All Paayment successfully retrieved.',
      data: await this.payment_service.get_all_payments(page, limit)
    };
  }
  
  @Roles()
  @ApiResponse( update_Payment_response)
  @ApiBadRequestResponse(update_Payment_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @Patch(':payment_id')
  async update_payment(@Param('payment_id', ParseIntPipe) payment_id: number, @Body() update_data: Update_Payment_Dto) {
    return{ 
      status: HttpStatus.OK,
      message: 'Payment Data Successfully Updated.',
      data: await this.payment_service.update_payment(+payment_id, update_data),
    };
  }

  @Roles()
  @ApiResponse(delete_Payment_response)
  @ApiBadRequestResponse(delete_Payment_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @Delete(':payment_id/soft-delete')
  async soft_delete_payment(@Param('payment_id', ParseIntPipe) payment_id: number) {
    const payment_data = await this.payment_service.soft_delete_payment(+payment_id);
    return {
      status: HttpStatus.OK,
      message: "Delete Data Payment Success!",
      data: payment_data,
    };
  }

  @Roles()
  @Delete(':payment_id/permanent-delete')
  async permanent_delete_data_payment(@Param('payment_id', ParseIntPipe) payment_id: number) {
    const payment_data = await this.payment_service.permanent_delete_payment(+payment_id);
    return {
      status: HttpStatus.OK,
      message: "Delete Data Payment Success - Permanently",
      data: payment_data,
    };
  }
}
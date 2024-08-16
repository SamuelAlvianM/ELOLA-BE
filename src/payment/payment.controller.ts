/* eslint-disable prettier/prettier */
import { unauthorized_response, unauthorized_role_response, get_Payment_by_id_bad_request_response, get_Payment_by_id_response, get_all_payments_bad_request_response, get_all_payments_response, create_Payment_bad_request_response, create_Payment_response, update_Payment_bad_request_response, update_Payment_response, delete_Payment_bad_request_response, delete_Payment_response } from '../../tests/swagger/payment.swagger';
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {CreatePayment, UpdatePayment } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Payment, Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( unauthorized_response )
  @ApiResponse( create_Payment_response)
  @ApiBadRequestResponse(create_Payment_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async createPayment(@Body() createPaymentDto: CreatePayment) {
    try {
      return await this.paymentService.createPayment(createPaymentDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create payment');
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( unauthorized_response )
  @ApiResponse( get_all_payments_response)
  @ApiBadRequestResponse(get_all_payments_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getPaymentById(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.getPaymentById(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( unauthorized_response )
  @ApiResponse( get_all_payments_response)
  @ApiBadRequestResponse(get_Payment_by_id_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Get()
  async getAllPayments(): Promise<Payment[]>{
    return this.paymentService.getAllPayments();
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( update_Payment_response)
  @ApiBadRequestResponse(update_Payment_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  async updatePayment(@Param('id') id: string, @Body() data: UpdatePayment) {
    return this.paymentService.updatePayment(+id, data);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(delete_Payment_response)
  @ApiBadRequestResponse(delete_Payment_bad_request_response)
  @ApiUnauthorizedResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async softDeletePayment(@Param('id') id: string) {
    const payment = await this.paymentService.softDeletePayment(+id);
    if (!payment) {
      throw new NotFoundException("Payment Data Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Payment Success!",
      data: payment,
    }
  }
}
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
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
  @ApiResponse( {status: 201, description: 'Successfully created'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  async createPayment(@Body() data: CreatePayment) {
    try {
      return await this.paymentService.createPayment(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create payment');
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Payment Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getPaymentById(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.getPaymentById(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Payment Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get()
  async getAllPayments(): Promise<Payment[]>{
    return this.paymentService.getAllPayments();
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Update Data Payment Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data!'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Put(':id')
  async updatePayment(@Param('id') id: string, @Body() data: UpdatePayment) {
    return this.paymentService.updatePayment(+id, data);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Payment Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
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
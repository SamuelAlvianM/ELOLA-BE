/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { createPayment, updatePayment } from './dto/payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() data: createPayment) {
    try {
      return await this.paymentService.createPayment(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create payment');
    }
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return this.paymentService.getPaymentById(+id);
  }

  @Get()
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Put(':id')
  async updatePayment(@Param('id') id: string, @Body() data: updatePayment) {
    return this.paymentService.updatePayment(+id, data);
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string) {
    return this.paymentService.deletePayment(+id);
  }
}

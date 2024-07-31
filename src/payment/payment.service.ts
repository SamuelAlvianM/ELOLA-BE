/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createPayment, updatePayment } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(data: createPayment) {
    // Check if the store_id exists
    const store = await this.prisma.store.findUnique({
      where: { store_id: data.store_id },
    });

    if (!store) {
      throw new NotFoundException(`Store with ID ${data.store_id} not found`);
    }

    return this.prisma.payment.create({
      data: {
        store_id: data.store_id,
        payment_name: data.payment_name,
        payment_type: data.payment_type,
      },
    });
  }

  async getPaymentById(payment_id: number) {
    return this.prisma.payment.findUnique({
      where: { payment_id },
    });
  }

  async getAllPayments() {
    return this.prisma.payment.findMany();
  }

  async updatePayment(payment_id: number, data: updatePayment) {
    return this.prisma.payment.update({
      where: { payment_id },
      data: {
        store_id: data.store_id,
        payment_name: data.payment_name,
        payment_type: data.payment_type,
      },
    });
  }

  async deletePayment(payment_id: number) {
    return this.prisma.payment.delete({
      where: { payment_id },
    });
  }
}

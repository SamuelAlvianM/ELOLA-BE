/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayment, UpdatePayment } from './dto/payment.dto';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(data: CreatePayment) {

    // Checking the store_id if it exist in the data
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

  async getAllPayments(): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        deleted_at: null
      },
    })
  }

  async getPaymentById(payment_id: number): Promise<Payment> {
    const payment = await this.prisma.payment.findFirst({
      where: {
        payment_id: payment_id,
        deleted_at: null,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${payment_id} not found or has been deleted.`);
    }

    return payment;
  }

  async updatePayment(payment_id: number, data: UpdatePayment) {
    return this.prisma.payment.update({
      where: { payment_id },
      data: {
        store_id: data.store_id,
        payment_name: data.payment_name,
        payment_type: data.payment_type,
      },
    });
  }

  async softDeletePayment(payment_id: number): Promise<Payment> {
    return this.prisma.payment.update({
      where: {
        payment_id: payment_id,
      },
      data: {
        deleted_at: new Date()
      }
    });
  }
}
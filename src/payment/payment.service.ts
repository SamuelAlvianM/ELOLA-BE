/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_Payment_Dto, Update_Payment_Dto, } from './dto/payment.dto';
import { payment } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create_payment(create_data: Create_Payment_Dto) {
    const { outlet_id, payment_name, payment_type } = create_data;

    const payment = await this.prisma.payment.create({
      data: {
        outlet_id: outlet_id || null, 
        payment_name,
        payment_type,
      },
    });

    return payment;
  }


  async get_all_payments(page: number, limit: number) {
    const max_limit = 10;
    const normal_limit = Math.min(limit, max_limit)
    const skip = (page - 1) * normal_limit;
    const [payments, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normal_limit,
      }),
      this.prisma.payment.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      data: payments,
      meta: {
        currentPage: page,
        itemsPerPage: normal_limit,
        totalPages: Math.ceil(total / normal_limit ),
        totalItems: total,
      },
    };
  }

  async get_payment_by_id(payment_id: number): Promise<payment> {
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

  async update_payment(payment_id: number, update_data: Update_Payment_Dto) {
    return this.prisma.payment.update({
      where: { payment_id },
      data: {
        outlet_id: update_data.outlet_id,
        payment_name: update_data.payment_name,
        payment_type: update_data.payment_type,
      },
    });
  }

  async soft_delete_payment(payment_id: number): Promise<payment> {
    const data_payment = await this.prisma.payment.findUnique({where:{payment_id}});

    if(!data_payment || data_payment.is_deleted) {
      throw new NotFoundException(`payment ${payment_id} not found`);
    }

    return this.prisma.payment.update({
      where: {
        payment_id: payment_id,
      },
      data: {
        is_deleted: true,
        deleted_at: new Date()
      }
    });
  }

  async permanent_delete_payment(payment_id: number): Promise<void> {
    const data_payment = await this.prisma.payment.findUnique({where: {payment_id}});

    if(!data_payment || data_payment.is_deleted) {
      throw new NotFoundException(`Data payment with id ${payment_id} not found`)
    }

    await this.prisma.payment.delete({ where: {payment_id}})
  }
}
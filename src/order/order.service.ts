import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_Order_Dto, Update_Order_Dto, Product_Dto } from './dto/order.dto';
import { UserService } from '../user/user.service';
import { order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create_order(order_data: Create_Order_Dto, user_id: string, outlet_id: string): Promise<order> {
    const { products, order_type, sub_total, grand_total, payment_type, change, customer_name, whatsapp_number } = order_data;

    const current_user = await this.userService.get_current_user(user_id);
    const current_user_id = current_user.user_id;

    // Generate receipt number
    const receipt_prefix = order_type === 'order' ? 'DI' : 'TA';
    const lastOrder = await this.prisma.order.findFirst({
      where: { outlet_id },
      orderBy: { receipt_number: 'desc' },
    });

    const receipt_number = lastOrder
      ? `${receipt_prefix}${(parseInt(lastOrder.receipt_number.substring(2)) + 1).toString().padStart(4, '0')}`
      : `${receipt_prefix}0001`;

    const active_tax = await this.prisma.tax.findMany({
      where: { tax_status: true },
    });

    if (active_tax.length === 0) {
      throw new BadRequestException('No active tax found.');
    }


    const order = await this.prisma.order.create({
      data: {
        outlet_id,
        user_id: current_user_id,
        order_type,
        receipt_number,
        sub_total,
        tax_id: active_tax[0].tax_id,
        grand_total,
        payment_type,
        change,
        customer_name: customer_name || null,
        whatsapp_number: whatsapp_number || null,
        order_products: {
          create: products.map(this.map_product_dto_to_prisma),
        },
      },
      include: { order_products: true },
    });

    if (payment_type === null) {
      await this.create_saved_order(order.order_id, false, false);
    } else {
      await this.create_saved_order(order.order_id, true, false);
    }

    return order;
  }

  private map_product_dto_to_prisma(product: Product_Dto): Prisma.order_productCreateWithoutOrdersInput  {
    return {
      quantity: product.quantity,
      product: {
        connect: { product_id: product.product_id.toString() }
      },
    };
  }

  private async create_saved_order(order_id: string, is_paid: boolean, is_done: boolean): Promise<void> {
    await this.prisma.saved_order.create({
      data: {
        order_id,
        is_paid,
        is_done,
        status: is_paid ? (is_done ? 'COMPLETED' : 'PAID_NOT_SERVED') : 'UNPAID',
      },
    });
  }

  async get_all_orders(page: number, limit: number) {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit);
    const skip = (page - 1) * normalLimit;
    
    const [orders, totalCount] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: {
          deleted_at: null,
        },
        skip: skip,
        take: normalLimit,
        include: { order_products: true },
      }),
      this.prisma.order.count({
        where: {
          deleted_at: null,
        },
      }),
    ]);

    return {
      orders,
      meta: {
        currentPage: page,
        itemsPerPage: normalLimit,
        totalPages: Math.ceil(totalCount / normalLimit),
        totalItems: totalCount,
      },
    };
  }

  async get_order_by_id(order_id: string) {
    const order = await this.prisma.order.findUnique({
      where: { order_id },
      include: { order_products: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${order_id} not found`);
    }
    return order;
  }

  async updateOrder(order_id: string, update_data: Update_Order_Dto) {
    return this.prisma.order.update({
      where: { order_id },
      data: update_data,
    });
  }

  async deleteOrder(order_id: string) {
    const order = await this.prisma.order.findUnique({ where: { order_id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${order_id} not found`);
    }
    return this.prisma.order.delete({ where: { order_id } });
  }
}




import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto, UpdateItemDto } from './dto/items.dto';
import { SavedOrderService } from '../saved_order/saved_order.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly savedOrderService: SavedOrderService,
  ) {}

  async createItem(createItemDto: CreateItemDto, order_id: number) {
    const product = await this.prisma.product.findUnique({
      where: { product_id: createItemDto.product_id },
    });

    if (!product) {
      throw new NotFoundException(`Item ${createItemDto.product_id} not found`);
    }

    const tax = await this.prisma.tax.findFirst({
      where: { tax_id: createItemDto.tax_id, tax_status: true },
    });

    const subtotal = createItemDto.quantity * product.product_price - (tax?.tax_value || 0);

    const newItem = await this.prisma.items.create({
      data: {
        ...createItemDto,
        sub_total: subtotal,
        order_id,
      },
      include: {
        product: true,
        tax: true,
      },
    });

    await this.savedOrderService.createSavedOrder(order_id);
    return newItem;
  }




  async getItems(order_id: number, page: number, limit: number) {
    const maxLimit = 50;
    const currentLimit = Math.min(limit, maxLimit);
    const skip = (page - 1) * currentLimit;
    const [ items, totalCount ] = await this.prisma.$transaction([
        this.prisma.items.findMany({
            where: {
                deleted_at: null,
            },
            skip: skip,
            take: currentLimit,
        }),
        this.prisma.items.count({
            where: {
                deleted_at: null,
            },
        }),
    ]);
    return {
      data: items,
      meta:{
        "Current Page": page,
        "Items Count": currentLimit,
        "Total Count": Math.ceil(totalCount / limit),
        "total Items": totalCount,
      },
    };
  }

  async getItemById(order_id: number) {
    const item = await this.prisma.items.findFirst({
      where: {
        order_id,
      },
      include: {
        product: true,
        tax: true,
      },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }


  async updateItem(item_id: number, updateItemDto: UpdateItemDto, order_id: number) {
    const existingItem = await this.prisma.items.findFirst({
      where: {
        item_id,
        order_id,
      },
    });
    if (!existingItem) {
      throw new NotFoundException('Item not found');
    }
    const product = await this.prisma.product.findUnique({
      where: { product_id: updateItemDto.product_id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const tax = await this.prisma.tax.findFirst({
      where: { tax_id: updateItemDto.tax_id, tax_status: true },
    });

    const subtotal = updateItemDto.quantity * product.product_price - (tax?.tax_value || 0);

    return this.prisma.items.update({
      where: { item_id: item_id },
      data: {
        ...updateItemDto,
        sub_total: subtotal,
      },
      include: {
        product: true,
        tax: true,
      },
    });
  }

  async deleteItem(id: number) {
    const item = await this.prisma.items.findUnique({
      where: { item_id: id },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return this.prisma.items.delete({
      where: { item_id: id },
    });
  }

  async softDeleteItem(item_id: number, order_id: number) {
    const existingItem = await this.prisma.items.findFirst({
      where: {
        item_id,
        order_id,
      },
    });
    if (!existingItem) {
      throw new NotFoundException('Item not found');
    }
    return this.prisma.items.update({
      where: { item_id },
      data: {
        deleted_at: new Date(),
      },
    });
  }
}
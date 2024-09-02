import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { SavedOrderService } from './saved_order.service';

@Controller('saved-orders')
export class SavedOrderController {
  constructor(private readonly savedOrderService: SavedOrderService) {}

  @Post(':order_id')
  @HttpCode(HttpStatus.CREATED)
  async createSavedOrder(@Param('order_id') order_id: number) {
    await this.savedOrderService.createSavedOrder(order_id);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Saved order created successfully',
      data: { order_id },
    };
  }

  @Patch(':order_id/pay')
  @HttpCode(HttpStatus.OK)
  async updateSavedOrderToPaid(@Param('order_id') order_id: number) {
    const updatedOrder = await this.savedOrderService.updateSavedOrderToPaid(order_id);
    if (updatedOrder.count === 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No unpaid saved order found to update',
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Saved order updated to PAID successfully',
      data: updatedOrder,
    };
  }

  @Get(':order_id')
  @HttpCode(HttpStatus.OK)
  async getSavedOrder(@Param('order_id') order_id: number) {
    const savedOrder = await this.savedOrderService.getSavedOrder(order_id);

    if (savedOrder.status === 'NOT PAID') {
      return {
        statusCode: HttpStatus.OK,
        message: 'Saved order is NOT PAID. Please return to the transaction to complete payment.',
        data: savedOrder,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Saved order retrieved successfully',
      data: savedOrder,
    };
  }

  @Delete(':saved_order_id')
  @HttpCode(HttpStatus.OK)
  async softDeleteSavedOrder(@Param('saved_order_id') saved_order_id: number) {
    const deletedOrder = await this.savedOrderService.softDeleteSavedOrder(saved_order_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Saved order deleted successfully',
      data: deletedOrder,
    };
  }
}

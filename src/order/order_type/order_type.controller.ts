import { Controller, Get, Post, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { OrderService } from './order_type.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order-type.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Order, Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':store_id/:user_id')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @ApiBearerAuth('JWT')
  async createOrder(
    @Param('store_id', ParseIntPipe) store_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @Body() createOrderDto: CreateOrderDto
  ) {
    const  createOrder = await this.orderService.createOrder(createOrderDto, store_id, user_id);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully, go to Item Page to continue Transaction',
      data: createOrder,
    }
  }

  @Get(':store_id/:user_id/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @ApiBearerAuth('JWT')
  async getOrderById(
    @Param('store_id', ParseIntPipe) store_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    const findById = await this.orderService.getOrderById(id, store_id, user_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order retrieved successfully',
      data: findById,
    }
  }

  @Get(':store_id/:user_id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all orders.' })
  @ApiBadRequestResponse({ description: 'Invalid query parameters.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiBearerAuth('JWT')
  async findAll(
    @Param('store_id', ParseIntPipe) store_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const findAllOrder = await this.orderService.getOrders(store_id, user_id, page, limit);
    return {
      statusCode: HttpStatus.OK,
      message: 'Orders retrieved successfully',
      data: findAllOrder,
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Order updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input or ID format.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiBearerAuth('JWT')
  @Patch(':store_id/:user_id/:id')
  async updateOrder(
    @Param('store_id', ParseIntPipe) store_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    const updateOrder = await this.orderService.updateOrder(id, updateOrderDto, store_id, user_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
      data: updateOrder,
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Order deleted successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid ID format.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiBearerAuth('JWT')
  @Delete(':store_id/:user_id/:id')
  async softDeleteOrder(
    @Param('store_id', ParseIntPipe) store_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    const deleteOrder = await this.orderService.softDeleteOrder(id, store_id, user_id);
    if (!deleteOrder) {
      throw new NotFoundException('Order not found.');
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Order deleted successfully.',
      data: deleteOrder
    };
  }
}

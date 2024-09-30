/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, ParseIntPipe, NotFoundException, Query, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Create_Order_Dto, Update_Order_Dto } from './dto/order.dto';
import { has_role } from '@prisma/client';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { get_tax_by_id_response } from '../../tests/swagger/tax.swagger';

@ApiTags('Orders')
@Controller('transactions')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class OrderController {
  constructor(private readonly transactionService: OrderService) {}

  @Post()
  @Roles()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBearerAuth('JWT')
  async createOrder(
    @Body() createOrderDto: Create_Order_Dto,
    @Query('order_id', ParseUUIDPipe) order_id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
  ) {

    const new_order = await this.transactionService.create_order(createOrderDto, order_id, user_id);
    return {
      message: 'Order created successfully!',
      data: new_order,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Fetch all transactions.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @Get()
  async get_all_order_data(@Query('page') page: number, @Query('limit') limit: number) {
    const get_all_orders = await this.transactionService.get_all_orders(page, limit);
    return {
      statusCode: HttpStatus.OK,
      message: 'Fetch all transactions successfully.',
      data: get_all_orders,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Fetch transaction by ID.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found' })
  @ApiBearerAuth('JWT')
  @Get(':order_id')
  async order_data_by_id(@Param('order_id', ParseUUIDPipe) order_id: string) {
    const get_order_data_by_id = await this.transactionService.get_order_by_id(order_id);
    return {
      message: 'Fetch transaction successfully.',
      data: get_order_data_by_id,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Order updated successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiBearerAuth('JWT')
  @Patch(':order_id')
  async update_order(@Query('order_id', ParseUUIDPipe) order_id: string, @Body() update_data: Update_Order_Dto) {
    const updated_order = await this.transactionService.updateOrder(order_id, update_data);
    return {
      message: 'Order updated successfully!',
      data: updated_order,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Order deleted successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found' })
  @ApiBearerAuth('JWT')
  @Delete(':order_id')
  async deleteOrder(@Query('order_id', ParseUUIDPipe) order_id: string) {
    const deleted_data = await this.transactionService.deleteOrder(order_id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Order deleted successfully!',
      data: deleted_data,
    };
  }
}

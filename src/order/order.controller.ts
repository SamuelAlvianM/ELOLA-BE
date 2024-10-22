/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, Query, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Create_Order_Dto, Update_Order_Dto } from './dto/order.dto';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Orders')
@Controller('transactions')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class OrderController {
  constructor(private readonly order_service: OrderService) {}

  @Post()
  @Roles()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  async createOrder(
    @Body() createOrderDto: Create_Order_Dto,
    @Query('order_id', ParseUUIDPipe) order_id: string,
    @Query('user_id', ParseUUIDPipe) user_id: string,
  ) {

    const new_order = await this.order_service.create_order(createOrderDto, order_id, user_id);
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
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @Get()
  async get_all_order_data(@Query('page') page: number, @Query('limit') limit: number) {
    const get_all_orders = await this.order_service.get_all_orders(page, limit);
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
  @Get(':order_id')
  async order_data_by_id(@Param('order_id', ParseUUIDPipe) order_id: string) {
    const get_order_data_by_id = await this.order_service.get_order_by_id(order_id);
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
  @Patch(':order_id')
  async update_order(@Query('order_id', ParseUUIDPipe) order_id: string, @Body() update_data: Update_Order_Dto) {
    const updated_order = await this.order_service.update_order_data(order_id, update_data);
    return {
      message: 'Order updated successfully!',
      data: updated_order,
    };
  }

  @Roles()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Order deleted successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found' })
  @Delete(':order_id/soft-delete')
  async soft_delete_order_data(@Query('order_id', ParseUUIDPipe) order_id: string) {
    const deleted_data = await this.order_service.soft_delete_order(order_id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Order soft-deleted successfully!',
      data: deleted_data,
    };
  }

  @Roles()
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Order deleted successfully.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Order not found' })
  @Delete(':order_id/permanent-delete')
  async permanent_delete_order(@Query('order_id', ParseUUIDPipe) order_id: string) {
    const deleted_data = await this.order_service.permanent_delete_order(order_id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Order deleted Permanently!',
      data: deleted_data,
    };
  }
}

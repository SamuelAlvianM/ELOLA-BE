import { Controller, Get, Post, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { ItemService } from './items.service';
import { CreateItemDto, UpdateItemDto } from './dto/items.dto';
import { JwtAuthGuard } from '../../utils/guard/jwt.guard';
import { RolesGuard } from '../../utils/guard/roles.guard';
import { Roles } from '../../utils/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Items')
@Controller('orders/:order_id/items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post(':order_id')
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('JWT')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Item created successfully.' })
  @ApiBadRequestResponse({ description: 'Failed to create item.' })
  async createItem(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Body() createItemDto: CreateItemDto
  ) {
    try {
      const item = await this.itemService.createItem(createItemDto, order_id);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Item created successfully.',
        data: item,
      };
    } catch (error) {
      throw new NotFoundException('Failed to create item');
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @Get()
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Items retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Failed to retrieve items.' })
  async getItems(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    const items = await this.itemService.getItems(order_id, page, limit);
    return {
      statusCode: HttpStatus.OK,
      message: 'Items retrieved successfully.',
      data: items,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @Get(':item_id')
  @ApiBearerAuth('JWT')
  @ApiResponse({ status: HttpStatus.OK, description: 'Item retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Failed to retrieve item.' })
  async getItemById(
    // @Param('order_id', ParseIntPipe) order_id: number,
    @Param('item_id', ParseIntPipe) item_id: number
  ){
    try {
      const item = await this.itemService.getItemById(item_id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Item retrieved successfully.',
        data: item,
      };
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Patch(':order_id/:item_id')
  @ApiBearerAuth('JWT')
  @ApiResponse({ status: HttpStatus.OK, description: 'Item updated successfully.' })
  @ApiBadRequestResponse({ description: 'Failed to update item.' })
  async updateItem(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Param('item_id', ParseIntPipe) item_id: number,
    @Body() updateItemDto: UpdateItemDto
  ) {
    try {
      const item = await this.itemService.updateItem(item_id, updateItemDto, order_id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Item updated successfully.',
        data: item,
      };
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Delete(':order_id/:item_id')
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Item deleted successfully.' })
  @ApiBadRequestResponse({ description: 'Failed to delete item.' })
  async softDeleteItem(
    @Param('order_id', ParseIntPipe) order_id: number,
    @Param('item_id', ParseIntPipe) item_id: number
  ) {
    try {
      const item = await this.itemService.softDeleteItem(item_id, order_id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Item deleted successfully.',
        data: item,
      };
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }
}

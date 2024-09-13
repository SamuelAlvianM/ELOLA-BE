import { Controller, Get, Post, Param, Body, Patch, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SavedOrderService } from './saved_order.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('saved-orders')
@ApiTags('Saved Orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SavedOrderController {
  constructor(private readonly savedOrderService: SavedOrderService) {}

  @Post()
  async create(@Body('transactionId') transactionId: number) {
    return this.savedOrderService.createSavedOrder(transactionId);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number, 
    @Query('limit', ParseIntPipe) limit: number
  ) {
    return this.savedOrderService.findAllSavedOrders(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.savedOrderService.findOneSavedOrder(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateSavedOrderDto: { is_done?: boolean; status?: string }
  ) {
    return this.savedOrderService.updateSavedOrder(id, updateSavedOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.savedOrderService.deleteSavedOrder(id);
  }
}

import { Controller, Get, Post, Param, Body, Patch, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { SavedOrderService } from './saved_order.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { saved_order } from '@prisma/client';

@Controller('saved-orders')
@ApiTags('Saved Orders')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class SavedOrderController {
  constructor(private readonly saved_order_service: SavedOrderService) {}

  @Get(':saved_order_saved_order_id')
  async get_saved_order(@Param('saved_order_saved_order_id') saved_order_id: string) {
    return this.saved_order_service.get_saved_order(Number(saved_order_id));
  }

  @Put(':saved_order_id')
  async update_saved_order(@Param('saved_order_id') saved_order_id: string, @Body() data: Partial<saved_order>) {
    return this.saved_order_service.update_saved_order(Number(saved_order_id), data);
  }

  @Put(':saved_order_id/serve')
  async mark_as_served(@Param('saved_order_id') saved_order_id: string) {
    return this.saved_order_service.mark_as_served(Number(saved_order_id));
  }

  @Get()
  async get_all_saved_orders(@Body() filters?: Partial<saved_order>) {
    return this.saved_order_service.get_all_saved_orders(filters);
  }

  @Delete(':saved_order_id')
  @ApiBearerAuth('JWT')
  @Roles()
  async remove(@Param('saved_order_id') saved_order_id: number) {
    return this.saved_order_service.deleted_save_order(saved_order_id);
  }
}

import { Controller, Get, Post, Param, Body, Patch, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { SavedOrderService } from './saved_order.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { has_role, saved_order } from '@prisma/client';

@Controller('saved-orders')
@ApiTags('Saved Orders')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class SavedOrderController {
  constructor(private readonly saved_order_service: SavedOrderService) {}

  @Get(':id')
  async get_saved_order(@Param('id') id: string) {
    return this.saved_order_service.get_saved_order(Number(id));
  }

  @Put(':id')
  async update_saved_order(@Param('id') id: string, @Body() data: Partial<saved_order>) {
    return this.saved_order_service.update_saved_order(Number(id), data);
  }

  @Put(':id/serve')
  async mark_as_served(@Param('id') id: string) {
    return this.saved_order_service.mark_as_served(Number(id));
  }

  @Get()
  async get_all_saved_orders(@Body() filters?: Partial<saved_order>) {
    return this.saved_order_service.get_all_saved_orders(filters);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @Roles()
  async remove(@Param('id') id: number) {
    return this.saved_order_service.deleteSavedOrder(id);
  }
}

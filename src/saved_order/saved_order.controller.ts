import { Controller, Get, Post, Param, Body, Patch, Delete, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SavedOrderService } from './saved_order.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { has_role } from '@prisma/client';

@Controller('saved-orders')
@ApiTags('Saved Orders')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class SavedOrderController {
  // constructor(private readonly savedOrderService: SavedOrderService) {}

  // @Post()
  // @ApiBearerAuth('JWT')
  // @Roles()
  // async create(@Body('transactionId') transactionId: number) {
  //   return this.savedOrderService.createSavedOrder(transactionId);
  // }

  // @Get()
  // @ApiBearerAuth('JWT')
  // @Roles()
  // async findAll(
  //   @Query('page', ParseIntPipe) page: number, 
  //   @Query('limit', ParseIntPipe) limit: number
  // ) {
  //   return this.savedOrderService.findAllSavedOrders(page, limit);
  // }

  // @Get(':id')
  // @ApiBearerAuth('JWT')
  // @Roles()
  // async findOne(@Param('id') id: number) {
  //   return this.savedOrderService.findOneSavedOrder(id);
  // }

  // @Patch(':id')
  // @ApiBearerAuth('JWT')
  // @Roles()
  // async update(
  //   @Param('id') id: number, 
  //   @Body() updateSavedOrderDto: { is_done?: boolean; status?: string }
  // ) {
  //   return this.savedOrderService.updateSavedOrder(id, updateSavedOrderDto);
  // }

  // @Delete(':id')
  // @ApiBearerAuth('JWT')
  // @Roles()
  // async remove(@Param('id') id: number) {
  //   return this.savedOrderService.deleteSavedOrder(id);
  // }
}

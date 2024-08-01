/* eslint-disable prettier/prettier */
// src/controller/promo.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';

@Controller('promos')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  create(@Body() createPromoDto: CreatePromoDto) {
    return this.promoService.createPromo(createPromoDto);
  }

  @Get()
  findAll() {
    return this.promoService.getAllPromos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.getPromoById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    return this.promoService.updatePromo(+id, updatePromoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoService.deletePromo(+id);
  }
}
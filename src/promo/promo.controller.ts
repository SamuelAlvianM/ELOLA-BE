/* eslint-disable prettier/prettier */
// src/controller/promo.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@Controller('promos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  
  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Successfully created'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
    async createPromo(@Body() createPromoDto: CreatePromoDto) {
        const result = await this.promoService.createPromo(createPromoDto)
        return {
          data: result
        }
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
/* eslint-disable prettier/prettier */
// src/controller/promo.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { Promo, Role } from '@prisma/client';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Promos')
@Controller('promos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  
  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Promo Data Created Successfully!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
    async createPromo(@Body() createPromoDto: CreatePromoDto) {
        const result = await this.promoService.createPromo(createPromoDto)
        return {
          data: result
        }
      }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Promo Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get()
  async getAllPromos(): Promise<Promo[]>{
    return this.promoService.getAllPromos();
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Promo Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getPromoById(@Param('id', ParseIntPipe) id: number): Promise<Promo> {
    return this.promoService.getPromoById(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Promo Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    return this.promoService.updatePromo(+id, updatePromoDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Promo Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async softDeletePromo(@Param('id') id: string) {
    const promos = await this.promoService.softDeletePromo(+id);
    if (!promos) {
      throw new NotFoundException("Promo Data Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Promo Success!",
      data: promos,
    }
  }
}
/* eslint-disable prettier/prettier */
import {unauthorized_response, unauthorized_role_response, get_all_promos_response, get_all_promo_bad_request_response, create_promo_response, create_promo_bad_request_response, get_promo_by_id_response, get_promo_by_id_bad_request_response, update_promo_response, update_promo_bad_request_response, apply_promo_response, apply_promo_bad_request_response, delete_promo_response, delete_promo_bad_request_response} from '../../tests/swagger/promo.swagger';
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, ParseIntPipe, NotFoundException, Query,} from '@nestjs/common';
import { PromoService } from './promo.service';
import { ApplyPromoDto, CreatePromoDto, UpdatePromoDto } from './dto/promo.dto';
import { has_role } from '@prisma/client';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Promos')
@Controller('promos')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  
  @Post()
  @Roles()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse(create_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(create_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  async createPromo(@Body() createPromoDto: CreatePromoDto) {
      const promo = await this.promoService.createPromoForProduct(createPromoDto);
      return {
        message: 'Promo Data Created Successfully!',
        data: promo,
      };
  }
      
  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse(get_all_promos_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(get_all_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @Get()
    async getAllPromos(@Query('page') page: number, @Query('limit') limit: number) {
        const promos = await this.promoService.getAllPromos(page, limit);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Fetch Data Promo Success',
            data: promos,
        };
    }

  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse(get_promo_by_id_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(get_promo_by_id_bad_request_response)
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getPromoById(@Param('id', ParseIntPipe) id: number) {
    const promo = await this.promoService.getPromoById(id);
    return {
      message: 'Fetch Data Promo Success',
      data: promo,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(update_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(update_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    const result_update = await this.promoService.updatepromo(+id, updatePromoDto);
    return {
      message: 'Data Promo Successfully Updated!',
      data: result_update,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(delete_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(delete_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async softDeletePromo(@Param('id') id: string) {
    const promos = await this.promoService.softDeletepromo(+id);
    if (!promos) {
      throw new NotFoundException("Promo Data Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Promo Success!",
      data: promos,
    }
  }

  @Roles()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse(apply_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(apply_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Post('apply')
  async applyPromo(@Body() applyPromoDto: ApplyPromoDto) {
    const applied_promos = await this.promoService.applypromo(applyPromoDto);
    return {
      message: 'Apply Promo to Product Success!!',
      data: applied_promos,
    };
  }

  @Post(':promo_id/apply-global')
  async apply_promo_global(
    @Param('promo_id', ParseIntPipe) promo_id: number,
  ) {
    const result = await this.promoService.applypromoGlobal(promo_id);
    return {
      status: HttpStatus.OK,
      message: 'success apply promo to all product, please check your price now',
      data: result,

    }
  }
}
/* eslint-disable prettier/prettier */
import {unauthorized_response, unauthorized_role_response, get_all_promos_response, get_all_promo_bad_request_response, create_promo_response, create_promo_bad_request_response, get_promo_by_id_response, get_promo_by_id_bad_request_response, update_promo_response, update_promo_bad_request_response, apply_promo_response, apply_promo_bad_request_response, delete_promo_response, delete_promo_bad_request_response} from '../../tests/swagger/promo.swagger';
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, ParseIntPipe, NotFoundException, Query,} from '@nestjs/common';
import { PromoService } from './promo.service';
import { Apply_Promo_Dto, Create_Promo_Dto, Update_Promo_Dto } from './dto/promo.dto';
import { has_role } from '@prisma/client';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Promos')
@Controller('promos')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class PromoController {
  constructor(private readonly promo_service: PromoService) {}

  
  @Post()
  @Roles()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse(create_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(create_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  async create_new_promo(@Body() create_data: Create_Promo_Dto) {
      const new_promo = await this.promo_service.create_new_promo(create_data);
      return {
        message: 'Promo Data Created Successfully!',
        data: new_promo,
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
    async find_all_promos(@Query('page') page: number, @Query('limit') limit: number) {
        const all_promos = await this.promo_service.get_all_promos(page, limit);
        return {
            StatusCode: HttpStatus.OK,
            response: 'Fetch Success, This is all Promo data.',
            data: all_promos,
        };
    }

  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse(get_promo_by_id_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(get_promo_by_id_bad_request_response)
  @ApiBearerAuth('JWT')
  @Get(':promo_id')
  async find_one_promo(@Param('promo_id', ParseIntPipe) promo_id: number) {
    const one_promo = await this.promo_service.get_one_promo(promo_id);
    return {
      message: 'Fetch Data Promo Success',
      data: one_promo,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(update_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(update_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Patch(':promo_id')
  async update(@Param('promo_id', ParseIntPipe) promo_id: number, @Body() update_data: Update_Promo_Dto) {
    const result_update = await this.promo_service.update_promo_data(+promo_id, update_data);
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
  @Delete(':promo_id')
  async soft_delete_promo(@Param('promo_id', ParseIntPipe) promo_id: number) {
    const promos = await this.promo_service.soft_delete_promo(+promo_id);
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(delete_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(delete_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Delete(':promo_id')
  async permanent_delete_promo(@Param('promo_id', ParseIntPipe) promo_id: number) {
    const deleted_data = await this.promo_service.permanent_delete_promo(+promo_id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Promo Success!",
      data: deleted_data,
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
  async applyPromo(@Body() applyPromoDto: Apply_Promo_Dto) {
    const applied_promos = await this.promo_service.applypromo(applyPromoDto);
    return {
      message: 'Apply Promo to Product Success!!',
      data: applied_promos,
    };
  }

  @Post(':promo_id/apply-global')
  async apply_promo_global(
    @Param('promo_id', ParseIntPipe) promo_id: number,
  ) {
    const result = await this.promo_service.applypromoGlobal(promo_id);
    return {
      status: HttpStatus.OK,
      message: 'success apply promo to all product, please check your price now',
      data: result,

    }
  }
}
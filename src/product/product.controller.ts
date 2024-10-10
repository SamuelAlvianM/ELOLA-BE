/* eslint-disable prettier/prettier */
import { create_product_response, create_product_bad_request_response, get_all_products_response, get_all_products_bad_request_response, get_product_by_id_response, get_product_by_id_bad_request_response, update_product_response, update_product_bad_request_response, remove_tax_from_product_response, remove_tax_from_product_bad_request_response,  get_product_with_taxes_promos_response, get_product_with_taxes_promos_bad_request_response, forbidden_role_response, unauthorized_response} from '../../tests/swagger/product.swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, UseGuards, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { Create_Product_Dto } from './dto/product.dto';
import { Update_Product_Dto } from './dto/update-product.dto';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { has_role } from '@prisma/client';
import { delete_promo_bad_request_response, delete_promo_response } from 'tests/swagger/promo.swagger';
import { PromoService } from '../promo/promo.service';

@ApiTags('Product')
@Controller('products')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard, Roles_Guards)
export class ProductController {
  constructor(private readonly product_service: ProductService) {}

  @Post()
  @Roles()
  @ApiResponse( create_product_response)
  @ApiResponse( create_product_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  async create_new_product(@Body() create_data: Create_Product_Dto) {
    const new_product_data = await this.product_service.create_new_product(create_data);
    return{
      status: HttpStatus.OK,
      message:'Product created successfully',
      data: new_product_data,
    };
  }

  @Roles()
  @ApiResponse( get_all_products_response)
  @ApiResponse( get_all_products_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'category', required: false, type: String })
  @ApiQuery({ name: 'product_name', required: false, type: String })
  @ApiQuery({ name: 'sort_field', required: false, type: String, example: 'created_at' })
  @ApiQuery({ name: 'sort_order', required: false, type: String, example: 'asc' })
  @Get('pages')
  async find_product_by_page(
    @Query() query: {
      page?: number;
      limit?: number;
      category?: string;
      product_name?: string;
      sort_field?: string;
      sort_order?: 'asc' | 'desc';
    }  
  ) {
    const {
      page = 1,
      limit = 10,
      category,
      product_name,
      sort_field,
      sort_order,
    } = query;
    return this.product_service.get_product_by_page(page,
      limit,
      {
        category,
        product_name,
      },
      sort_field,
      sort_order,
    );
  }

  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_all_products_response)
  @ApiResponse( get_all_products_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Get('all')
  async find_all_products() {
    const find_products = await this.product_service.find_all_products();
    return {
      status: HttpStatus.OK,
      response: "All Products fetched successfully",
      data: find_products
    };
  }
  
  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_product_by_id_response)
  @ApiResponse( get_product_by_id_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Get(':product_id')
  async find_one_product(@Param('product_id') product_id: string) {
    const find_product = await this.product_service.find_one_product(product_id);
    return {
      status: HttpStatus.OK,
      message: 'Successfully get product by request',
      data: find_product,
    };
  }

  @Roles()
  @ApiResponse( update_product_response)
  @ApiResponse( update_product_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @Put(':product_id')
  async update_product_data(@Param('product_id') product_id: string, @Body() update_data: Update_Product_Dto) {
    const updated_product = await this.product_service.update_product(product_id, update_data)
    return {
      status: HttpStatus.OK,
      message: 'Successfully update product data',
      data: updated_product,
    };
  }

  @Roles()
  @ApiResponse( delete_promo_response)
  @ApiResponse( delete_promo_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @Patch(':product_id')
  async soft_delete(@Param('product_id') product_id: string) {
    const soft_delete_data =  await this.product_service.soft_delete_product(product_id);
    return{
      status: HttpStatus.OK,
      message: 'Successfully soft deleting product data.',
      data: soft_delete_data,
    };
  }

  @Roles()
  @ApiResponse( delete_promo_response)
  @ApiResponse( delete_promo_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @Delete(':product_id')
  async permanent_delete(@Param('product_id') product_id: string) {
    const permanent_delete =  await this.product_service.permanent_delete_product(product_id);
    return{
      status: HttpStatus.OK,
      message: 'Successfully delete product data PERMANENTLY.',
      data: permanent_delete,
    };
  }



  @Roles()
  @ApiResponse( get_product_with_taxes_promos_response)
  @ApiResponse( get_product_with_taxes_promos_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @Post(':product_id/taxes/:tax_id')
  async add_tax_to_product(
    @Param('product_id') product_id: string,
    @Param('tax_id') tax_id: string,
  ) {
    const added_tax = await this.product_service.add_tax_product(product_id, tax_id)
    return {
      status: HttpStatus.OK,
      message: 'Success add tax to product.',
      data: added_tax,
    };
  }

  @Roles()
  @ApiResponse( remove_tax_from_product_response)
  @ApiResponse( remove_tax_from_product_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @Delete(':product_id/taxes/:tax_id')
  async remove_tax_from_product(
    @Param('product_id') product_id: string,
    @Param('tax_id') tax_id: number,
  ) {
    const removed_tax = await this.product_service.remove_tax_product(product_id, tax_id);
    return {
      status: HttpStatus.OK,
      message: 'Success remove tax from product',
      data: removed_tax,
    };
  }

  @Roles()
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_product_by_id_response)
  @ApiResponse( get_product_by_id_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Get(':product_id')
  async get_product_with_tax_promo(@Param('product_id') product_id: string) {
    const data = await this.product_service.get_product_taxes_promos(product_id);
    return {
      status: HttpStatus.OK,
      message: 'Success get product with tax and promo',
      data: data,
    }
  }
}
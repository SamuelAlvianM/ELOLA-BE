/* eslint-disable prettier/prettier */
import { create_product_response, create_product_bad_request_response, get_all_products_response, get_all_products_bad_request_response, get_product_by_id_response, get_product_by_id_bad_request_response, update_product_response, update_product_bad_request_response, delete_product_response, delete_product_bad_request_response, add_tax_to_product_response, add_tax_to_product_bad_request_response, remove_tax_from_product_response, remove_tax_from_product_bad_request_response, add_promo_to_product_response, add_promo_to_product_bad_request_response, remove_promo_from_product_response, remove_promo_from_product_bad_request_response, get_product_with_taxes_promos_response, get_product_with_taxes_promos_bad_request_response, forbidden_role_response, unauthorized_response} from '../../tests/swagger/product.swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, UseGuards, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Role } from '@prisma/client';
import { create_promo_response, delete_promo_bad_request_response, delete_promo_response } from 'tests/swagger/promo.swagger';

@ApiTags('Product')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( create_product_response)
  @ApiResponse( create_product_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create_product(createProductDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_all_products_response)
  @ApiResponse( get_all_products_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @Get('pages')
  async find_product_by_page(@Query('page') page: number, @Query('limit') limit: number) {
    return this.productService.get_product_by_page(page, limit);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_all_products_response)
  @ApiResponse( get_all_products_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Get('all')
  async find_all_products() {
    const find_products = await this.productService.find_all_products();
    return {
      status: HttpStatus.OK,
      response: "All Products fetched successfully",
      data: find_products
    };
  }
  
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_product_by_id_response)
  @ApiResponse( get_product_by_id_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( update_product_response)
  @ApiResponse( update_product_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse( delete_promo_response)
  @ApiResponse( delete_promo_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( get_product_with_taxes_promos_response)
  @ApiResponse( get_product_with_taxes_promos_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Post(':productId/taxes/:taxId')
  async addTaxToProduct(
    @Param('productId') productId: string,
    @Param('taxId') taxId: string,
  ) {
    return this.productService.add_tax_product(productId, taxId);
  }
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse( remove_tax_from_product_response)
  @ApiResponse( remove_tax_from_product_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Delete(':productId/taxes/:taxId')
  async removeTaxFromProduct(
    @Param('productId') productId: number,
    @Param('taxId') taxId: number,
  ) {
    return this.productService.remove_tax_product(productId, taxId);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( get_product_by_id_response)
  @ApiResponse( get_product_by_id_bad_request_response)
  @ApiResponse( forbidden_role_response )
  @ApiResponse( unauthorized_response)
  @ApiBearerAuth('JWT')
  @Get(':productId')
  async getProductWithTaxesAndPromos(@Param('productId') productId: number) {
    return this.productService.get_product_taxes_promos(productId);
  }
}
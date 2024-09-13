/* eslint-disable prettier/prettier */
import { unauthorized_role_response, update_pc_bad_request_response, create_product_category_id_bad_request_response, unauthorized_response, get_all_product_categories_response, get_all_product_categories_bad_request_response, create_product_category_response, create_product_category_bad_request_response, get_product_category_by_id_response, update_product_category_response, delete_product_category_response, delete_product_category_bad_request_response} from '../../tests/swagger/product_category.swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';
import {  Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';

@ApiTags('Product Categories')
@Controller('products/product-category')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation( {summary: 'Create a new product_category'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(create_product_category_response)
  @ApiResponse(create_product_category_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async createNewCategory(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @Query('storeId', ParseIntPipe) storeId: number,
  ) {
    const result = await this.productCategoryService.createNewCategory(createProductCategoryDto, storeId);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Data Category Product Created Success!",
      data: result,
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation( {summary: 'Get All Product Category'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(get_all_product_categories_response)
  @ApiResponse(get_all_product_categories_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiQuery({ name: 'filter', required: false, type: String, description: 'Filter by category_name (partial match)' })
  @ApiQuery({ name: 'sortField', required: false, type: String, description: 'Sort field (e.g., category_name, created_at)', example: 'Desserts' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Sort order (asc or desc)', example: 'asc' })
  // @Get()
  // async getAllProductCategory(@Query('page') page: number, @Query('limit') limit: number){
  //   return this.productCategoryService.getAllProductCategory(page, limit)
  // }

  @Get()
  async getAllProductCategory(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 })) page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 })) limit: number = 10,
    @Query('filter') filter?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ){
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;
    const { data, meta } = await this.productCategoryService.getAllProductCategory(page, limit, filter, sortField, sortOrder);

    return {
      data,
      meta: {
        currentPage: meta.currentPage,
        itemsPerPage: meta.itemsPerPage,
        totalPages: meta.totalPages,
        totalItems: meta.totalItems,
      },
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation( {summary: 'Get products category by id'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(get_product_category_by_id_response)
  @ApiResponse(create_product_category_id_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getProductCategoryById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productCategoryService.getProductCategoryById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success get Product Category Product by id',
      data: result
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse(unauthorized_response)
  @ApiResponse(update_product_category_response)
  @ApiResponse(update_pc_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Patch()
  async updateCategory(
    @Query('category_id', ParseIntPipe) category_id: number,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto, 
  ) {
    const result = await this.productCategoryService.updateCategory(category_id, updateProductCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Update Data Category Product Success!",
      data: result,
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized_response)
  @ApiResponse(delete_product_category_response)
  @ApiResponse(delete_product_category_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async softDeleteProductCategory(@Param('id') id: string) {
    const category = await this.productCategoryService.softDeleteProductCategory(+id);
    if (!category) {
      throw new NotFoundException("Data Category Product Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Data Category Product Successfully Deleted!",
      data: category,
    }
  }
}

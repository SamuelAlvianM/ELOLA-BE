/* eslint-disable prettier/prettier */
import { unauthorized_role_response, update_pc_bad_request_response, create_product_category_id_bad_request_response, unauthorized_response, get_all_product_categories_response, get_all_product_categories_bad_request_response, create_product_category_response, create_product_category_bad_request_response, get_product_category_by_id_response, update_product_category_response, delete_product_category_response, delete_product_category_bad_request_response} from '../../tests/swagger/product_category.swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { Create_Product_Category_Dto, Update_Product_Category_Dto } from './dto/productCategory.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';

@ApiTags('Product Categories')
@Controller('products/product-category')
@UseGuards(JwtAuthGuard)
export class ProductCategoryController {
  constructor(private readonly product_category_service: ProductCategoryService) {}

  @Roles()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation( {summary: 'Create a new product_category'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(create_product_category_response)
  @ApiResponse(create_product_category_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async create_new_category(
    @Body() create_product_category_data: Create_Product_Category_Dto,
    @Query('outlet_id') outlet_id: string,
  ) {
    const new_data = await this.product_category_service.create_new_data(create_product_category_data, outlet_id);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Data Category Product Created Success!",
      data: new_data,
    }
  }

  @Roles()
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
  @Get()
  async get_all_product_categories(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 })) page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 })) limit: number = 10,
    @Query('filter') filter?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ){
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;
    const { data, meta } = await this.product_category_service.get_all_product_categories(page, limit, filter, sortField, sortOrder);

    return {
      data,
      meta: {
        current_page: meta.current_page,
        items_per_page: meta.items_per_page,
        total_pages: meta.total_pages,
        total_items: meta.total_items,
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
  @Get(':product_category_id')
  async find_one_product_category(@Param('product_category_id', ParseIntPipe) product_category_id: number) {
    const one_data_product_category = await this.product_category_service.get_one_product_category(product_category_id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success get Product Category Product by id',
      data: one_data_product_category,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles()
  @ApiResponse(unauthorized_response)
  @ApiResponse(update_product_category_response)
  @ApiResponse(update_pc_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Patch()
  async update_category(
    @Query('category_id', ParseIntPipe) category_id: number,
    @Body() update_data: Update_Product_Category_Dto, 
  ) {
    const updated_data = await this.product_category_service.update_product_category(category_id, update_data);
    return {
      statusCode: HttpStatus.CREATED,
      message: "Update Data Category Product Success!",
      data: updated_data,
    }
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized_response)
  @ApiResponse(delete_product_category_response)
  @ApiResponse(delete_product_category_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Delete(':product_category_id')
  async soft_delete_product_category(@Param('product_category_id', ParseIntPipe) product_category_id: number) {
    const data_product_category = await this.product_category_service.soft_delete_product_category(+product_category_id);
    if (!data_product_category) {
      throw new NotFoundException("Data product category Product Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Data product category Product Successfully Deleted!",
      data: data_product_category,
    }
  }

  @Roles()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(unauthorized_response)
  @ApiResponse(delete_product_category_response)
  @ApiResponse(delete_product_category_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Delete(':product_category_id')
  async permanent_delete_product_category(@Param('product_category_id', ParseIntPipe) product_category_id: number) {
    const data_product_category = await this.product_category_service.permanent_delete_product_category(product_category_id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Data Category Product Successfully Deleted PERMANENTLY",
      data: data_product_category,
    }
  }
}

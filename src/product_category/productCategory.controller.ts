/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';
import { ProductCategory, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';

@ApiTags('Product Categoriest')
@Controller('products/product-category')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Data Category Product Created Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Category Product Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get()
  getAllProductCategory(): Promise<ProductCategory[]> {
    return this.productCategoryService.getAllProductCategory()
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Category Product Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getProductCategoryById(@Param('id', ParseIntPipe) id: number): Promise<ProductCategory> {
    return this.productCategoryService.getProductCategoryById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Update Data Category Product Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data!'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth('JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Category Product Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
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

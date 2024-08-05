/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductCategoryService } from './productCategory.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';
import { ProductCategory, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';


@Controller('products/product-category')
@UseGuards(JwtAuthGuard, RolesGuard) //place it here if it applied to every method level
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard) placed this if not every method level need the specified guards
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Data Category Product Created Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Category Product Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  getAllProductCategory(): Promise<ProductCategory[]> {
    return this.productCategoryService.getAllProductCategory()
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Category Product Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get(':id')
  async getProductCategoryById(@Param('id', ParseIntPipe) id: number): Promise<ProductCategory> {
    return this.productCategoryService.getProductCategoryById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Update Data Category Product Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data!'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productCategoryService.remove(+id);
  // }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Category Product Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
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

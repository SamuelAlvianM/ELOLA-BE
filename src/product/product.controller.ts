/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post(':productId/taxes/:taxId')
  async addTaxToProduct(
    @Param('productId') productId: number,
    @Param('taxId') taxId: number,
  ) {
    return this.productService.add_tax_product(productId, taxId);
  }

  @Delete(':productId/taxes/:taxId')
  async removeTaxFromProduct(
    @Param('productId') productId: number,
    @Param('taxId') taxId: number,
  ) {
    return this.productService.remove_tax_product(productId, taxId);
  }

  @Post(':productId/promos/:promoId')
  async addPromoToProduct(
    @Param('productId') productId: number,
    @Param('promoId') promoId: number,
  ) {
    return this.productService.add_promo_product(productId, promoId);
  }

  @Delete(':productId/promos/:promoId')
  async removePromoFromProduct(
    @Param('productId') productId: number,
    @Param('promoId') promoId: number,
  ) {
    return this.productService.remove_promo_product(productId, promoId);
  }

  @Get(':productId')
  async getProductWithTaxesAndPromos(@Param('productId') productId: number) {
    return this.productService.get_product_taxes_promos(productId);
  }

}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { PromoService } from 'src/promo/promo.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly promoService: PromoService,

  ) {}

  async get_product_taxes_promos( product_id: number) {
    return this.prisma.product.findUnique({
      where: { product_id: product_id },
      include: {
        ProductTax: {
          include: {
            tax: true,
          },
        },
        ProductPromo: {
          include: {
            promo: true,
          },
        },
      },
    });
  }

  async add_tax_product(product_id: number, tax_id: number) {
    return this.prisma.productTax.create({
      data: {
        product_id: product_id,
        tax_id: tax_id,
      },
    });
  }

  async add_promo_product(product_id: number, promo_id: number) {
    return this.prisma.productPromo.create({
      data: {
        product_id: product_id,
        promo_id: promo_id,
      },
    });
  }

  async remove_tax_product(product_id: number, tax_id: number) {
    return this.prisma.productTax.delete({
      where: {
        product_id_tax_id:{
          product_id: product_id,
          tax_id: tax_id,
        },
      },
    });
  }

  async remove_promo_product(product_id: number, promo_id: number) {
    return this.prisma.productPromo.delete({
      where: {
        product_id_promo_id: { product_id: product_id, promo_id: promo_id},
      },
    });
  }

  async create(createProductDto: CreateProductDto) {
    const { product_price, product_code, ...rest } = createProductDto;
    const products = await this.prisma.product.create({
      data: {product_code, ...rest, product_price}
    })

    const promo = await this.promoService.applyPromoProduct(products.product_id);
    

    // const promo = await this.prisma.promo.findFirst({
    //   where: {
    //     product_id: rest.product_code,
    //     start_date: {
    //       lte: new Date(),
    //     },
    //     end_date: {
    //       gte: new Date(),
    //     },
    //   },
    //   orderBy: {
    //     end_date: 'asc'
    //   }
    // });

    let final_price = product_price;

    if (promo) {
      if (promo.promo_type === 'Discount') {
        final_price -= promo.promo_value;
      } else if (promo.promo_type === 'Sales') {
        final_price = promo.promo_value;
      }
    }

    await this.prisma.product.update({
      where: { product_id: products.product_id },
      data: { product_price: final_price },
    });

    // const products = await this.prisma.product.create({
    //   data: {
    //     product_price: final_price,
    //     ...rest,
    //   },
    // });

    return {
      ...products,
      product_price: final_price,
      applied_promo: promo ? {
        promo_name: promo.promo_name,
        promo_type: promo.promo_type,
        promo_value: promo.promo_value,
      } : null,
    };
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { product_id: id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { product_price, ...rest } = updateProductDto;
    const promo = await this.prisma.promo.findFirst({
      where: {
        product_id: rest.product_code
      },
      orderBy: {
        end_date: 'desc'
      },
    });

    const final_price = product_price && promo ? product_price + promo.promo_value : product_price;
    
    return this.prisma.product.update({
      where: { product_id: id },
      data: {
        ...rest,
        ...(product_price && { product_price: final_price }),
      },
    });
  }

  async remove(product_id: number): Promise<Product> {
    return this.prisma.product.update({
      where: { product_id },
      data: { deleted_at: new Date()}
    });
  }
}
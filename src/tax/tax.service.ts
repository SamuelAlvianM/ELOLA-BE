/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTaxDto, UpdateTaxDto } from './dto/tax.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaxService {
    constructor(private prisma: PrismaService) {}

    async findAllTaxes(page: number, limit: number) {
        const maxLimit = 10;
        const normalLimit = Math.min(limit, maxLimit)
        const skip = (page - 1) * normalLimit;
        const [taxes, totalCount] = await this.prisma.$transaction([
          this.prisma.tax.findMany({
            where: {
              deleted_at: null,
            },
            skip: skip,
            take: normalLimit,
          }),
          this.prisma.tax.count({
            where: {
              deleted_at: null,
            },
          }),
        ]);
    
        return {
          taxes,
          meta: {
            currentPage: page,
            itemsPerPage: normalLimit,
            totalPages: Math.ceil(totalCount / normalLimit ),
            totalItems: totalCount,
          },
        };
      }

    async findOneTax(tax_id: number) {
        return await this.prisma.tax.findUnique({
          where: {
            tax_id: tax_id, 
            deleted_at: null
          },
        });
    }

    async createTax(create_tax_data: CreateTaxDto) {

        if(create_tax_data.tax_status) {
          await this.prisma.tax.updateMany({
            where: {
              deleted_at: null,
              tax_status: true,
            },
            data: {
              tax_status: false,
            },
          });
        }

        const data_tax = await this.prisma.tax.create({
            data: {
                ...create_tax_data,
            },
        });
        return data_tax;
    }

    async updateTax(tax_id: number,update_tax_data: UpdateTaxDto) {

      if(update_tax_data.tax_status) {
        await this.prisma.tax.updateMany({
          where: {
            deleted_at: null,
            tax_id: { not: tax_id },
            tax_status: true,
          },
          data: {
            tax_status: false,
          },
        });
      }
      
      const updated_data = await this.prisma.tax.update({
        where: {tax_id: tax_id},
        data: {
            ...update_tax_data,
        }
    });
        return updated_data;
    }

    async deleteTax(tax_id: number) {
        return await this.prisma.tax.update({ 
            where: { tax_id: tax_id },
            data: {deleted_at: new Date()} 
        });
    }
}
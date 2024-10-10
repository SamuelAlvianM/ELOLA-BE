/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Create_Tax_Dto, Update_Tax_Dto } from './dto/tax.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { tax_type } from '@prisma/client';

@Injectable()
export class TaxService {
    constructor(private prisma: PrismaService) {}

    async find_all_taxes(page: number, limit: number) {
        const max_limit = 10;
        const normal_limit = Math.min(limit, max_limit)
        const skip = (page - 1) * normal_limit;
        const [taxes, total] = await this.prisma.$transaction([
          this.prisma.tax.findMany({
            where: {
              deleted_at: null,
            },
            skip: skip,
            take: normal_limit,
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
            current_page: page,
            items_per_page: normal_limit,
            total_pages: Math.ceil(total / normal_limit ),
            total_items: total,
          },
        };
      }

      async tax_data_for_order() {
        const vat_data = await this.prisma.tax.findFirst({
          where: { tax_status: true, tax_type: 'vat' },
          select: {
            tax_name: true,
            tax_value: true,
            tax_type: true,
          },
        });
    
        const service_data = await this.prisma.tax.findFirst({
          where: { tax_status: true, tax_type: 'service' },
          select: {
            tax_name: true,
            service_value: true,
            tax_type: true,
          },
        });
    

        return {
          VAT: vat_data ? {
            tax_type: vat_data.tax_type,
            tax_value: vat_data.tax_value,
          } : null,
          Service: service_data ? {
            tax_type: service_data.tax_type,
            service_value: service_data.service_value,
          } : null,
        };
      }

    async find_one_tax(tax_id: number) {
        return await this.prisma.tax.findUnique({
          where: {
            tax_id: tax_id, 
            deleted_at: null
          },
        });
    }

    async create_new_tax(create_tax_data: Create_Tax_Dto) {

        if(create_tax_data.tax_status) {
          await this.prisma.tax.updateMany({
            where: {
              deleted_at: null,
              tax_type: create_tax_data.tax_type,
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
                tax_value: create_tax_data.tax_type === 'vat' ? create_tax_data.tax_value : null,
                service_value: create_tax_data.tax_type === 'service' ? create_tax_data.service_value : null,
            },
        });
        return data_tax;
    }

    async update_tax_data(tax_id: number,update_tax_data: Update_Tax_Dto){

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

    async soft_delete_tax(tax_id: number) {
      const check_for_tax_data = await this.prisma.tax.findUnique({where: {tax_id}});

      if (!check_for_tax_data || check_for_tax_data.is_deleted) {
        throw new NotFoundException(`tax_id ${tax_id} not found`);
      }

        return await this.prisma.tax.update({ 
            where: { tax_id: tax_id },
            data: {is_deleted: true, deleted_at: new Date()} 
        });
    }

    async permanent_delete_tax(tax_id: number) {
      const check_tax_data = await this.prisma.tax.findUnique({ where: {tax_id}});

      if(!check_tax_data || check_tax_data.is_deleted) {
        throw new NotFoundException(`tax_id ${tax_id} not found`)
      }

      return await this.prisma.tax.delete({
        where: {tax_id}
      });
    }
}
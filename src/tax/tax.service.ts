/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTaxDto, UpdateTaxDto } from './dto/tax.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaxService {
    constructor(private prisma: PrismaService) {}


    async findAllTaxes() {
        return await this.prisma.tax.findMany({
            where: {deleted_at: null}
        });
    }

    async findOneTax(tax_id: number) {
        return await this.prisma.tax.findUnique({where: {tax_id: tax_id, deleted_at: null}});
    }

    async createTax(create_tax_data: CreateTaxDto) {
        const data_tax = await this.prisma.tax.create({
            data: {
                ...create_tax_data,
            },
        });
        return data_tax;
    }

    async updateTax(tax_id: number,update_tax_data: UpdateTaxDto) {
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
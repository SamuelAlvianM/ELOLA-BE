/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_DP_Dto, Update_DP_Dto } from './dto/dp.dto';
import { driver_partner } from '@prisma/client';

@Injectable()
export class DriverPartnerService {
    constructor(private prisma: PrismaService) {}
    
    async findAll_Driver_Partner(page: number, limit: number) {
        const maxLimit = 10;
        const normalLimit = Math.min(limit, maxLimit)
        const skip = (page - 1) * normalLimit;
        const [drivers, totalCount] = await this.prisma.$transaction([
          this.prisma.driver_partner.findMany({
            where: {
              deleted_at: null,
            },
            skip: skip,
            take: normalLimit,
          }),
          this.prisma.driver_partner.count({
            where: {
              deleted_at: null,
            },
          }),
        ]);
    
        return {
          data: drivers,
          meta: {
            currentPage: page,
            itemsPerPage: normalLimit,
            totalPages: Math.ceil(totalCount / normalLimit ),
            totalItems: totalCount,
          },
        };
      }

    async findOne_Driver_Partner(driver_partner_id: number) {
        return this.prisma.driver_partner.findFirst({
            where: {
                driver_partner_id: driver_partner_id,
                deleted_at: null,
            },
        });
    }

    async create_Driver_Partner(create_driver_partner: Create_DP_Dto, outlet_id: string) {

        const { partner_name, benefit} = create_driver_partner;
        return this.prisma.driver_partner.create({
            data: {
                partner_name: partner_name,
                benefit: benefit,
                outlets: {
                    connect:{outlet_id: outlet_id}
                }
            },
        });
    }

    async update_driver_partner(update_driver_partner: Update_DP_Dto, driver_partner_id: number) {
        const { partner_name, benefit } = update_driver_partner;
        return this.prisma.driver_partner.update({
            where: { driver_partner_id: driver_partner_id },
            data: {
                partner_name: partner_name,
                benefit: benefit,
            },
        });
    }

    async delete_driver_partner (driver_partner_id: number): Promise<driver_partner> {
        return this.prisma.driver_partner.update({
            where: {
                driver_partner_id,
            },
            data: {
                deleted_at: new Date()
            },
        });
    }
}

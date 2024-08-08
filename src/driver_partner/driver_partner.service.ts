/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_DP_Dto, Update_DP_Dto } from './dto/dp.dto';
import { DriverPartner } from '@prisma/client';

@Injectable()
export class DriverPartnerService {
    constructor(private prisma: PrismaService) {}

    async findAll_Driver_Partner() {
        return this.prisma.driverPartner.findMany({
            where: {
                deleted_at: null,
            }
        });
    }

    async findOne_Driver_Partner(driver_partner_id: number) {
        return this.prisma.driverPartner.findFirst({
            where: {
                driver_partner_id: driver_partner_id,
                deleted_at: null,
            },
        });
    }

    async create_Driver_Partner(create_driver_partner: Create_DP_Dto) {

        const { partner_name, benefit, store_id} = create_driver_partner;
        return this.prisma.driverPartner.create({
            data: {
                partner_name: partner_name,
                benefit: benefit,
                stores: {
                    connect:{store_id: store_id}
                }
            },
        });
    }

    async update_driver_partner(update_driver_partner: Update_DP_Dto, driver_partner_id: number) {
        const { partner_name, benefit } = update_driver_partner;
        return this.prisma.driverPartner.update({
            where: { driver_partner_id: driver_partner_id },
            data: {
                partner_name: partner_name,
                benefit: benefit,
            },
        });
    }

    async delete_driver_partner (driver_partner_id: number): Promise<DriverPartner> {
        return this.prisma.driverPartner.update({
            where: {
                driver_partner_id,
            },
            data: {
                deleted_at: new Date()
            },
        });
    }
}

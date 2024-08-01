import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_DP_Dto, Update_DP_Dto } from './dto/dp.dto';

@Injectable()
export class DriverPartnerService {
    constructor(private prisma: PrismaService) {}

    async findAll_Driver_Partner() {
        return this.prisma.driverPartner.findMany();
    }

    async findOne_Driver_Partner(driver_partner_id: number) {
        return this.prisma.driverPartner.findUnique({
            where: {
                driver_partner_id: driver_partner_id,
            },
        });
    }

    async create_Driver_Partner(create_driver_partner: Create_DP_Dto, store_id: number) {

        const { driver_partner_name, benefit} = create_driver_partner;
        return this.prisma.driverPartner.create({
            data: {
                partner_name: driver_partner_name,
                benefit: benefit,
                store_id
            },
        });
    }

    async update_driver_partner(update_driver_partner: Update_DP_Dto, driver_partner_id: number) {
        const { driver_partner_name, benefit } = update_driver_partner;
        return this.prisma.driverPartner.update({
            where: { driver_partner_id },
            data: {
                partner_name: driver_partner_name,
                benefit: benefit,
            },
        });
    }

    async delete_driver_partner(driver_partner_id: number) {
        return await this.prisma.driverPartner.delete({
            where: { driver_partner_id },
        })
    }

    
}

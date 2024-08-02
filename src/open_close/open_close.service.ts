import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { Update_Store_Dto } from '../store/dto/store.dto';

@Injectable()
export class OpenCloseService {
  constructor(private readonly prisma: PrismaService) {}

  private async open_cashier(user_id: number, store_id: number, open_close: any) {
    if (open_close && open_close.is_cashier) {
        throw new BadRequestException('Cashier is already open');
    }

    return await this.prisma.openClose.create ({
        data: {
            user_id,
            store_id,
            is_cashier_open: true,
            open_by: user_id,
            open_date: new Date(),
            bill_quantity: 0,
        },
    });
  }

  private async close_cashier( user_id: number, store_id: number, open_close: any) {
    if (!open_close && open_close.is_cashier_open) {
        throw new BadRequestException('Cashier is not open');
    }

    const transactions_count = await this.prisma.transaction.count ({
        where: {
            store_id, 
            created_at: {
                gte: open_close.open_date, // lebih besar dan sama dengan = gte
                lte: new Date() // lebih kecil dan sama dengan = lte
            }},
    });
    return await this.prisma.openClose.update({
        where: { user_id_store_id: { user_id, store_id}},
        data: {
            is_cashier_open: false,
            close_by: user_id,
            close_date: new Date(),
            bill_quantity: transactions_count,
        }
    })
  }

  async handle_cashier_status(user_id: number,store_id: number, oc_dto: Handle_Open_Close_Dto) {
    const open_close = await this.prisma.openClose.findUnique({
        where: { user_id_store_id: {user_id, store_id}},
    });

    if (oc_dto.is_cashier_open) {
        return await this.open_cashier(user_id, store_id, open_close)
    } else { 
        return await this.close_cashier(user_id, store_id, open_close)
    }
  }

}
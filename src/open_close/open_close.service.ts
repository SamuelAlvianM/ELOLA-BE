import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { Update_Store_Dto } from '../store/dto/store.dto';

@Injectable()
export class OpenCloseService {
  constructor(private readonly prisma: PrismaService) {}

  private async open_cashier(user_id: number, store_id: number, open_close: Handle_Open_Close_Dto) {
    if (open_close && open_close.is_cashier_open) {
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

  private async close_cashier(user_id: number, order_id: number, open_close: any) {
    // Jika tidak ada sesi terbuka atau kasir tidak terbuka
    if (!open_close || !open_close.is_cashier_open) {
      throw new BadRequestException('Cashier is not open. There is no open session to close.');
    }

    const transactions_count = await this.prisma.savedOrder.count({
      where: {
        order_id,
        created_at: {
          gte: open_close.open_date, // lebih besar dan sama dengan = gte
          lte: new Date() // lebih kecil dan sama dengan = lte
        }
      },
    });

    return await this.prisma.openClose.update({
      where: { open_close_id: open_close.open_close_id },
      data: {
        is_cashier_open: false,
        close_by: user_id,
        close_date: new Date(),
        bill_quantity: transactions_count,
      }
    });
  }

  async handle_cashier_status(user_id: number, store_id: number, oc_dto: Handle_Open_Close_Dto) {
    const open_close = await this.prisma.openClose.findFirst({
      where: {
        store_id,
        is_cashier_open: true,
      },
      orderBy: {
        open_date: 'desc',
      },
    });

    if (oc_dto.is_cashier_open) {
      // Jika kasir sudah terbuka
      if (open_close && open_close.is_cashier_open) {
        throw new BadRequestException('Cashier is already open. Please close it first if you want to open it again.');
      }

      return await this.open_cashier(user_id, store_id, open_close);
    } else {
      // Jika kasir sudah ditutup
      if (!open_close || !open_close.is_cashier_open) {
        throw new BadRequestException('Cashier is not open. There is no open session to close.');
      }

      return await this.close_cashier(user_id, store_id, open_close);
    }
  }

  async get_all_data_open_close() {
    try {
      return await this.prisma.openClose.findMany();
    } catch (error) {
      throw new BadRequestException('Error when fetching open/close sessions');
    }
  }

  async delete_data_open_close(id: number): Promise<void> {
    try {
      const openCloseSession = await this.prisma.openClose.findUnique({
        where: { open_close_id: id },
      });

      if (!openCloseSession) {
        throw new NotFoundException(`Open/close session with ID ${id} not found`);
      }

      await this.prisma.openClose.delete({
        where: { open_close_id: id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error when deleting open/close session');
    }
  }
}

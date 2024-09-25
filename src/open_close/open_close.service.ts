import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { Update_Outlet_Dto } from '../outlet/dto/outlet.dto';

@Injectable()
export class OpenCloseService {
  constructor(private readonly prisma: PrismaService) {}


  async getOpenSessionForStore(outlet_id: string) {
    return this.prisma.open_close.findFirst({
      where: {
        outlet_id,
        is_cashier_open: true,
      },
      orderBy: {
        start_time: 'desc',
      },
    });
  }

  private async open_cashier(user_id: string, outlet_id: string, open_close: Handle_Open_Close_Dto) {
    if (open_close && open_close.is_cashier_open) {
        throw new BadRequestException('Cashier is already open');
    }

    return await this.prisma.open_close.create ({
        data: {
            user_id,
            outlet_id,
            is_cashier_open: true,
            start_time: new Date(),
            bill_quantity: 0,
        },
    });
  }
  

  private async close_cashier(user_id: string, outlet_id: string, open_close: any) {
    // Jika tidak ada sesi terbuka atau kasir tidak terbuka
    if (!open_close || !open_close.is_cashier_open) {
      throw new BadRequestException('Cashier is not open. There is no open session to close.');
    }

    const transactions_count = await this.prisma.open_close.count({
      where: {
        user_id,
        outlet_id,
        created_at: {
          gte: open_close.open_date, // lebih besar dan sama dengan = gte
          lte: new Date() // lebih kecil dan sama dengan = lte
        }
      },
    });

    return await this.prisma.open_close.update({
      where: { open_close_id: open_close.open_close_id },
      data: {
        is_cashier_open: false,
        end_time: new Date(),
        bill_quantity: transactions_count,
      }
    });
  }

  async handle_cashier_status(user_id: string, outlet_id: string, oc_dto: Handle_Open_Close_Dto) {
    const open_close = await this.prisma.open_close.findFirst({
      where: {
        outlet_id,
        is_cashier_open: true,
      },
      orderBy: {
        start_time: 'desc',
      },
    });

    if (oc_dto.is_cashier_open) {
      // Jika kasir sudah terbuka
      if (open_close && open_close.is_cashier_open) {
        throw new BadRequestException('Cashier is already open. Please close it first if you want to open it again.');
      }

      return await this.open_cashier(user_id, outlet_id, open_close);
    } else {
      // Jika kasir sudah ditutup
      if (!open_close || !open_close.is_cashier_open) {
        throw new BadRequestException('Cashier is not open. There is no open session to close.');
      }

      return await this.close_cashier(user_id, outlet_id, open_close);
    }
  }

  async get_all_data_open_close() {
    try {
      return await this.prisma.open_close.findMany();
    } catch (error) {
      throw new BadRequestException('Error when fetching open/close sessions');
    }
  }

  async delete_data_open_close(id: number): Promise<void> {
    try {
      const openCloseSession = await this.prisma.open_close.findUnique({
        where: { open_close_id: id },
      });

      if (!openCloseSession) {
        throw new NotFoundException(`Open/close session with ID ${id} not found`);
      }

      await this.prisma.open_close.delete({
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

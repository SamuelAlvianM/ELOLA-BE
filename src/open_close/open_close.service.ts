import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { Update_Outlet_Dto } from '../outlet/dto/outlet.dto';
import { user } from '@prisma/client'
import { UserService } from '../user/user.service';
import { validate_user_name } from 'src/common/auth/validation-helper';

@Injectable()
export class OpenCloseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user_service: UserService,
  ) {}


  async get_open_session_for_outlet(outlet_id: string, user_id: string) {
    return this.prisma.open_close.findFirst({
      where: {
        outlet_id,
        is_cashier_open: true,
        open_close_by: {
          some: {user_id},
        },
      },
      orderBy: {
        start_time: 'desc',
      },
    });
  }

  private async open_cashier(user_id: string, outlet_id: string, user_name: string) {
    const current_user = await this.user_service.get_current_user_name(user_name, user_id);
    const open_session = await this.get_open_session_for_outlet(outlet_id, user_id);

    if (open_session && current_user) {
        throw new BadRequestException(`Cashier is already open for this ${current_user.user_name}`);
    }

    const new_session = await this.prisma.open_close.create({
      data: {
        outlet_id,
        is_cashier_open: true,
        start_time: new Date(),
        bill_quantity: 0,
    },
    })

    await this.prisma.open_close_user.create({
      data: {
        open_close_id: new_session.open_close_id,
        user_id,
      },
    });

    return new_session;
  }
  

  private async close_cashier(user_id: string, outlet_id: string, open_close: any) {
    if (!open_close || !open_close.is_cashier_open) {
      throw new BadRequestException('Cashier is not open. There is no open session to close.');
    }

    const orders_count = await this.prisma.open_close.count({
      where: {
        outlet_id,
        created_at: {
          gte: open_close.start_time, // bigger and equal than gte
          lte: new Date() // smaller and equal than lte
        }
      },
    });

    return await this.prisma.open_close.update({
      where: { open_close_id: open_close.open_close_id },
      data: {
        is_cashier_open: false,
        end_time: new Date(),
        bill_quantity: orders_count,
      }
    });
  }

  async handle_cashier_status(user_name: string, user_id: string, outlet_id: string, oc_dto: Handle_Open_Close_Dto) {
    const open_close = await this.get_open_session_for_outlet(user_id, outlet_id);

    if (oc_dto.is_cashier_open) {
      // If cashier is already open for this user, throw an exception
      if (open_close) {
        throw new BadRequestException('Cashier is already open for this user. Close it first to reopen.');
      }

      return this.open_cashier(user_id, outlet_id, user_name);
    } else {
      // If cashier is not open for this user, throw an exception
      if (!open_close || !open_close.is_cashier_open) {
        throw new BadRequestException('No open cashier session to close for this user.');
      }

      return this.close_cashier(user_id, outlet_id, open_close);
    }
  }

  // Get all open/close sessions across all outlets and users
  async get_all_data_open_close() {
    try {
      return await this.prisma.open_close.findMany({
        include: {
          open_close_by: true, // Include the users who opened/closed the session
          outlet: true, // Include the outlet details
        },
      });
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

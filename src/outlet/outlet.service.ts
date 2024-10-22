/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Outlet_Dto, Update_Outlet_Dto } from './dto/outlet.dto';
import { has_role } from '@prisma/client';
import { NotFoundError } from 'rxjs';


@Injectable()
export class OutletService {
    constructor(private prisma: PrismaService) {}

    async create_new_store(user_id: string, create_outlet: Create_Outlet_Dto) {
        const existing_outlet = await this.prisma.outlet.findUnique({
            where: { outlet_name: create_outlet.outlet_name },
          });
      
          if (existing_outlet) {
            throw new ConflictException(`outlet named: ${create_outlet.outlet_name} already exists`);
          }

        let company_id: string;
        let branch_id: string;

        const current_user = await this.prisma.user.findUnique({
          where: { user_id: user_id},
          include: {
            company:{ select: {company_id: true}},
            branches: { select: {branch_id: true}},
          }
        });

        if ( current_user && current_user.company && current_user.branches) {
          company_id = current_user.company.company_id;
          branch_id = current_user.branches.branch_id;
        } else {
          throw new ConflictException('company and branch must be specified')
        }

        const new_outlet = await this.prisma.outlet.create({
          data: {
            ...create_outlet,
            company_id: company_id,
            branch_id: branch_id,
          },
        });
    
        return new_outlet;
      }
  

    async get_all_active_outlets(page: number, limit: number) {
        const max_limit = 100;
        const normal_limit = Math.min(limit, max_limit)
        const skip = (page - 1) * normal_limit;
        const [outlets, total_count] = await this.prisma.$transaction([
          this.prisma.outlet.findMany({
            where: {
              deleted_at: null,
              is_deleted: false,
            },
            skip: skip,
            take: normal_limit,
          }),
          this.prisma.outlet.count({
            where: {
              deleted_at: null,
              is_deleted: false
            },
          }),
        ]);
    
        return {
          outlets,
          meta: {
            "Current Page": page,
            "Items per Page": normal_limit,
            "Total Pages": Math.ceil(total_count / limit),
            "Total Items": total_count,
          },
        };
      }

      async get_all_outlets(page: number, limit: number) {
        const max_limit = 100;
        const normal_limit = Math.min(limit, max_limit)
        const skip = (page - 1) * normal_limit;
        const [outlets, total_count] = await this.prisma.$transaction([
          this.prisma.outlet.findMany({
            skip: skip,
            take: normal_limit,
          }),
          this.prisma.outlet.count({}),
        ]);
    
        return {
          outlets,
          meta: {
            "Current Page": page,
            "Items per Page": normal_limit,
            "Total Pages": Math.ceil(total_count / limit),
            "Total Items": total_count,
          },
        };
      }

    async get_outlet_by_id(outlet_id: string) {
      const outlet_by_id = await this.prisma.outlet.findUnique({ 
        where: { 
            outlet_id: outlet_id, 
            deleted_at: null,
            is_deleted: false
        },
        include: { 
          users: true,
          branch: true,
          company: true,
          orders: true,
        },
      });

      if (outlet_by_id.is_deleted === true) {
        throw new BadRequestException(`Outlet id: ${outlet_by_id.outlet_id} does not exist or has been deleted`);
      }

      if(!outlet_by_id) {
        throw new NotFoundException(`Outlet ${outlet_by_id} not found`);
      }
        return outlet_by_id;
    }

    async update_outlet_data(outlet_id: string, update_outlet: Update_Outlet_Dto) {
      const exist_outlet = await this.prisma.outlet.findUnique({
        where: { outlet_id: outlet_id },
      });

      if(!exist_outlet) {
        throw new NotFoundException(`Outlet with id ${outlet_id} does not exist`);
      }

      const updated_data_outlet = await this.prisma.outlet.update({
        where: { outlet_id: outlet_id },
        data: update_outlet
      });

      return updated_data_outlet;
    }

    async soft_delete_outlet(outlet_id: string) {
      const exist_outlet = await this.prisma.outlet.findUnique({
        where: { outlet_id: outlet_id },
      });

      if(!exist_outlet || exist_outlet.is_deleted) {
        throw new NotFoundException(`Outlet with id ${outlet_id} not found or has been deleted`);
      }

      const deleted_outlet_data = await this.prisma.outlet.update({
        where: { outlet_id: outlet_id },
        data: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      });

      return deleted_outlet_data;
    }

    async permanent_delete_outlet(outlet_id: string) {
      const exist_outlet = await this.prisma.outlet.findUnique({
        where: { outlet_id: outlet_id },
      });

      if(!exist_outlet || exist_outlet.is_deleted) {
        throw new NotFoundException(`Outlet with id ${outlet_id} not found or has been deleted`);
      }

      const permanent_delete = await this.prisma.outlet.delete({
        where: { outlet_id: outlet_id },
      });

      return permanent_delete;
    }

}

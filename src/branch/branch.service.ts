// src/branch/branch.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_Branch_Dto, Update_Branch_Dto } from './dto/branch.dto';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async create_new_branch(create_branch: Create_Branch_Dto) {
    const exist_branch = await this.prisma.branch.findUnique({
      where: { branch_name: create_branch.branch_name },
    });

    if (exist_branch) {
      throw new BadRequestException(`Branch ${create_branch.branch_name} already exists`);
    }

    const new_branch_data = await this.prisma.branch.create({
      data: create_branch,
    });

    return new_branch_data;
  }

  async get_all_branches(page: number, limit: number) {
    const max_limit = 20;
    const normal_limit = Math.min(limit, max_limit);
    const skip = (page - 1) * normal_limit;

    const [branches, total] = await this.prisma.$transaction([
      this.prisma.branch.findMany({
        where: { is_deleted: false },
        skip,
        take: normal_limit,
      }),
      this.prisma.branch.count({
        where: { is_deleted: false },
      }),
    ]);

    return {
      data: branches,
      meta: {
        current_page: page,
        items_per_page: normal_limit,
        total_pages: Math.ceil(total / normal_limit),
        total_items: total,
      },
    };
  }

  async get_branch_data_by_id(branch_id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { branch_id },
    });

    if (!branch || branch.is_deleted) {
      throw new NotFoundException(`Branch not found or has been deleted`);
    }

    return branch;
  }

  async update_branch_data(branch_id: string, update_branch: Update_Branch_Dto) {
    const updated_branch = await this.prisma.branch.findUnique({
      where: { branch_id },
    });

    if (!updated_branch || updated_branch.is_deleted) {
      throw new NotFoundException(`Branch with ID ${branch_id} not found`);
    }

    return await this.prisma.branch.update({
      where: { branch_id },
      data: update_branch,
    });
  }

  async soft_delete_branch(branch_id: string) {
    const deleted_data = await this.prisma.branch.findUnique({
      where: { branch_id },
    });

    if (!deleted_data || deleted_data.is_deleted) {
      throw new NotFoundException(`Branch not found or already deleted`);
    }

    return await this.prisma.branch.update({
      where: { branch_id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }

  async permanent_delete_branch(branch_id: string) {
    const permanent_delete_data = await this.prisma.branch.findUnique({
      where: { branch_id },
    });

    if (!permanent_delete_data || permanent_delete_data.is_deleted) {
      throw new NotFoundException(`Branch not found or already deleted`);
    }

    return await this.prisma.branch.delete({
      where: { branch_id },
    });
  }
}


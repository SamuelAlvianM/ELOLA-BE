import { BadRequestException, NotFoundException, ConflictException, Injectable  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create_Company_Dto, Update_Company_Dto } from './dto/company.dto';

@Injectable()
export class CompanyService {
    constructor(
        private prisma: PrismaService
    ) {}

    async create_new_company(create_company: Create_Company_Dto) {
        const exist_company = await this.prisma.company.findUnique({
            where: { company_name: create_company.company_name },
        });

        if(exist_company) {
            throw new BadRequestException(`Company ${create_company.company_name} already exists`);
        }

        const new_company_data = await this.prisma.company.create({
            data: create_company,
        });

        return new_company_data;
    }


    async find_all_company_data(page: number, limit: number) {
        const max_limit = 20;
        const normal_limit = Math.min(limit, max_limit);
        const skip = (page - 1) * normal_limit;
        const [companies, total] = await this.prisma.$transaction([
          this.prisma.company.findMany({
            where: {
              deleted_at: null,
            },
            skip: skip,
            take: normal_limit,
          }),
          this.prisma.company.count({
            where: {
              deleted_at: null,
            },
          }),
        ]);
    
        return {
          data: companies,
          meta: {
            current_page: page,
            items_per_page: normal_limit,
            total_pages: Math.ceil(total / normal_limit ),
            total_items: total,
          },
        };
      }

    async find_company_by_id(company_id: string) {
        const company_data = await this.prisma.company.findUnique({ where: { company_id: company_id} });

        if (!company_data || company_data.is_deleted) {
            throw new NotFoundException(`Company ${company_data.company_name} not found or has been deleted`);
        }

        return company_data;
    }

    async get_company_with_associations(company_id: string) {
        const company_detail = await this.prisma.company.findUnique({
            where: { company_id },
            include: {
                branches: true,
                outlets: true,
                users: true,
            },
        });

        if (!company_detail || company_detail.is_deleted) {
            throw new NotFoundException(`Company with ID ${company_id} not found or has been deleted`);
        }

        return {
            company_iinfo : company_detail,
            branches: company_detail.branches,
            outlets: company_detail.outlets,
            users: company_detail.users,
        };
    }


    async update_company(company_id: string, update_data: Update_Company_Dto) {
        const updated_company_data = await this.prisma.company.findUnique({
            where: { company_id },
        });
        if (!updated_company_data || updated_company_data.is_deleted) {
            throw new NotFoundException(`Company with ID ${company_id} not found`);
        }

        return await this.prisma.company.update({
            where: { company_id },
            data: update_data,
        });

    }

    async soft_delete_company(company_id: string) {
        const deleted_company = await this.prisma.company.findUnique({
            where: { company_id },
        });

        if (!deleted_company || deleted_company.is_deleted) {
            throw new NotFoundException(`Company with ID ${company_id} not found`);
        }

        return await this.prisma.company.update({
            where: { company_id },
            data: { is_deleted: true, deleted_at: new Date() },
        });
    }

    async permanently_delete_company(company_id: string) {
        const selected_data = await this.prisma.company.findUnique({
            where: { company_id },
        });

        if (!selected_data || selected_data.is_deleted) {
            throw new NotFoundException(`Company with ID ${company_id} not found`);
        }

        return await this.prisma.company.delete({
            where: { company_id },
        });
    }

}

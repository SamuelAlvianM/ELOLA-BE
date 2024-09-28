import { Controller, Delete, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, UseGuards, Post, Get, Patch, Body, Query, CanActivate } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { Roles_Guards } from 'src/utils/guard/roles.guard';
import { CompanyService } from './company.service';
import { Create_Company_Dto, Update_Company_Dto } from './dto/company.dto';


@ApiTags('Companies')
@Controller('company')
@UseGuards(JwtAuthGuard, Roles_Guards)
@ApiBearerAuth('JWT')
export class CompanyController {
  constructor(private readonly company_service: CompanyService) {}

  @Post()
  @Roles()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Company created successfully' })
  @ApiBadRequestResponse({ description: 'Company already exists' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async create_company(@Body() create_company: Create_Company_Dto) {
    const new_company_data = this.company_service.create_new_company(create_company);

    return {
        status: HttpStatus.CREATED,
        message: "New company data created successfully",
        data: new_company_data,
    }
}

  @Get()
  @Roles()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved all companies' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async get_all_company(@Query('page') page: number, @Query('limit') limit: number) {
    const companies = await this.company_service.find_all_company_data(page, limit);
    return {
      StatusCode: HttpStatus.OK,
      response: 'Fetched all companies successfully!',
      data: companies,
    };
  }

  @Get(':company_id')
  @HttpCode(HttpStatus.OK)
  @Roles()
  @ApiOperation({ summary: 'Get company by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Company found' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async get_company_data_by_id(@Param('company_id', ParseUUIDPipe) company_id: string) {
    const data_company_by_id = this.company_service.find_company_by_id(company_id);
    return {
        status: HttpStatus.OK,
        message:"Success retrieve data company by id.",
        data: data_company_by_id,
    }
  }

  @Get(':company_id/details')
  @HttpCode(HttpStatus.OK)
  @Roles()
  @ApiOperation({ summary: 'Get company details with associated branches, outlets, and users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Company details with associations' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async get_company_detail_data(@Param('company_id', ParseUUIDPipe) company_id: string) {
    const company_data = await this.company_service.get_company_with_associations(company_id);
    return {
        status: HttpStatus.OK,
        message: "This is Company detail data you requested.",
        data: company_data,
    }
  }

  @Patch(':company_id')
  @HttpCode(HttpStatus.OK)
  @Roles()
  @ApiOperation({ summary: 'Update company details' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Company updated successfully' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async update_company_data(@Param('company_id', ParseUUIDPipe) company_id: string, @Body() update_company_data: Update_Company_Dto) {
    const updated_company = await this.company_service.update_company(company_id, update_company_data); 
    return {
        status: HttpStatus.OK,
        message: "Data Company successfully updated",
        data: updated_company,
    }
  }

  @Delete(':company_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles()
  @ApiOperation({ summary: 'Soft delete a company' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Company deleted successfully' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async softDeleteCompany(@Param('company_id', ParseUUIDPipe) company_id: string) {
    const company = await this.company_service.delete_company(company_id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Company deleted successfully',
      data: company,
    };
  }

  @Delete(':id/permanent')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles()
  @ApiOperation({ summary: 'Permanently delete a company' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Company permanently deleted successfully' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access' })
  async permanentDeleteCompany(@Param('id', ParseUUIDPipe) id: string) {
    const company = await this.company_service.permanently_delete_company(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Company permanently deleted successfully',
      data: company,
    };
  }
}
// src/branch/branch.controller.ts
import { Controller, Post, Get, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { BranchService } from './branch.service';
import { Create_Branch_Dto, Update_Branch_Dto } from './dto/branch.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Branches')
@Controller('branch')
export class BranchController {
  constructor(private readonly branch_service: BranchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Branch created successfully' })
  @ApiBadRequestResponse({ description: 'Branch already exists' })
  async create_new_branch(@Body() create_branch: Create_Branch_Dto) {
    const new_branch = await this.branch_service.create_new_branch(create_branch);
    return {
      status: HttpStatus.CREATED,
      message: 'Branch created successfully',
      data: new_branch,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved all branches' })
  async get_all_branches(@Query('page') page: number, @Query('limit') limit: number) {
    const data_branches = await this.branch_service.get_all_branches(page, limit);
    return {
      status: HttpStatus.OK,
      message: 'Fetched all branches successfully',
      data: data_branches,
    };
  }

  @Get(':branch_id')
  @ApiOperation({ summary: 'Get branch by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Branch found' })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  async get_branch_id(@Param('branch_id') branch_id: string) {
    const branch = await this.branch_service.get_branch_data_by_id(branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return {
      status: HttpStatus.OK,
      message: 'Branch found successfully',
      data: branch,
    };
  }

  @Patch(':branch_id')
  @ApiOperation({ summary: 'Update a branch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Branch updated successfully' })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  async update_branch(@Param('branch_id') branch_id: string, @Body() update_branch: Update_Branch_Dto) {
    const updated_data = await this.branch_service.update_branch_data(branch_id, update_branch);
    return {
      status: HttpStatus.OK,
      message: 'Branch updated successfully',
      data: updated_data,
    };
  }

  @Delete(':branch_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete a branch' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Branch deleted successfully' })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  async soft_delete_branch_data(@Param('branch_id') branch_id: string) {
    await this.branch_service.soft_delete_branch(branch_id);
    return {
      status: HttpStatus.NO_CONTENT,
      message: 'Branch deleted successfully',
    };
  }

  @Delete(':branch_id/permanent')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Permanently delete a branch' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Branch permanently deleted successfully' })
  @ApiNotFoundResponse({ description: 'Branch not found' })
  async permanent_delete_branch_data(@Param('branch_id') branch_id: string) {
    await this.branch_service.permanent_delete_branch(branch_id);
    return {
      status: HttpStatus.NO_CONTENT,
      message: 'Branch permanently deleted successfully',
    };
  }
}

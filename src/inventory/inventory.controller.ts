/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpStatus, UseGuards, HttpCode, ParseIntPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Inventory, Role } from '@prisma/client';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Inventories')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Inventory Data Successfully Created!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Inventory Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  async getAllInventory(): Promise<Inventory[]> {
    return this.inventoryService.getAllInventory();
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Inventory Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get(':id')
  async getInventoryById(@Param('id', ParseIntPipe) id: number): Promise<Inventory> {
    return this.inventoryService.getInventoryById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Update Data Inventory Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data!'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch(':id')
  async updateInventory(@Param('id') id: string, @Body() data: UpdateInventoryDto) {
    return this.inventoryService.updateInventory(+id, data);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Deleted data Inventory Success!'})
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete(':id')
  async softDeleteInventory(@Param('id') id: string) {
    const inventory = await this.inventoryService.softDeleteInventory(+id);
    if (!inventory) {
      throw new NotFoundException("Inventory Data Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Inventory Success!",
      data: inventory,
    }
  }
}

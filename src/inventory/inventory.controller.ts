/* eslint-disable prettier/prettier */
import { unauthorized_role_response, get_all_inventories_response, get_all_inventories_bad_request_response, create_inventory_response, create_inventory_bad_request_response, get_inventory_by_id_response, get_inventory_by_id_bad_request_response, update_inventory_response, update_inventory_bad_request_response, delete_inventory_response, delete_inventory_bad_request_response, unauthorized_response,} from '../../tests/swagger/inventory.swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpStatus, UseGuards, HttpCode, ParseIntPipe, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Inventory, Role } from '@prisma/client';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiOperation, ApiUnauthorizedResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Inventories')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation( {summary: 'Create a new inventory'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(create_inventory_response)
  @ApiResponse(create_inventory_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @Post()
  create(
    @Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation( {summary: 'Get All Inventory'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(get_all_inventories_response)
  @ApiResponse(get_all_inventories_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async getAllInventory(@Query('page') page: number, @Query('limit') limit: number) {
    const inventories = await this.inventoryService.getAllInvetory(page, limit);
    return {
        StatusCode: HttpStatus.OK,
        response: 'Fetch Data Inventory Success!',
        data: inventories,
    };
}

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiOperation( {summary: 'Get Inventory by ID'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(get_inventory_by_id_response)
  @ApiResponse(get_inventory_by_id_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async getInventoryById(@Param('id', ParseIntPipe) id: number): Promise<Inventory> {
    return this.inventoryService.getInventoryById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation( {summary: 'Update Inventory'})
  @ApiBearerAuth('JWT')
  @ApiResponse(unauthorized_response)
  @ApiResponse(update_inventory_response)
  @ApiResponse(update_inventory_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  async updateInventory(@Param('id') id: string, @Body() data: UpdateInventoryDto) {
    return this.inventoryService.updateInventory(+id, data);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation( {summary: 'Delete Data Inventory'})
  @ApiResponse(unauthorized_response)
  @ApiResponse(delete_inventory_response)
  @ApiResponse(delete_inventory_bad_request_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
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

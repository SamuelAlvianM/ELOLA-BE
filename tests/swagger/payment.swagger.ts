import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateInventoryDto, UpdateInventoryDto } from '../../src/inventory/dto/inventory.dto';

// Unauthorized role response
export const unauthorized_role_response: ApiResponseOptions = {
  status: 403,
  description: 'Forbidden: User does not have the required role',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 403 },
      message: { type: 'string', example: 'Forbidden resource, you have to be owner or admin Role to access this resource' },
      error: { type: 'string', example: 'Forbidden' },
    },
  },
};

// GET all inventories response
export const get_all_inventories_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all inventories',
  isArray: true,
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully fetched all inventories' },
      data: { type: 'array', items: { $ref: '#/components/schemas/CreateInventoryDto' } },
    },
  },
};

export const get_all_inventories_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching all inventories',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching all inventories' },
    },
  },
};

// POST create a new inventory
export const create_inventory_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully created inventory',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 201 },
      response: { type: 'string', example: 'Created new Inventory' },
      data: { $ref: '#/components/schemas/CreateInventoryDto' },
    },
  },
};

export const create_inventory_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when creating inventory',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating inventory' },
    },
  },
};

// GET a single inventory by ID
export const get_inventory_by_id_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched inventory by id',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully fetched Inventory' },
      data: { $ref: '#/components/schemas/CreateInventoryDto' },
    },
  },
};

export const get_inventory_by_id_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching inventory',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching inventory' },
    },
  },
};

// PATCH update an inventory
export const update_inventory_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully updated inventory',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully updated inventory' },
      data: { $ref: '#/components/schemas/UpdateInventoryDto' },
    },
  },
};

export const update_inventory_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when updating inventory',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when updating inventory' },
    },
  },
};

// DELETE soft delete an inventory
export const delete_inventory_response: ApiResponseOptions = {
  status: 204,
  description: 'Successfully deleted inventory',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 204 },
      response: { type: 'string', example: 'Delete Data Inventory Success!' },
      data: { $ref: '#/components/schemas/CreateInventoryDto' },
    },
  },
};

export const delete_inventory_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when deleting inventory',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting inventory' },
    },
  },
};

export const unauthorized_response: ApiResponseOptions = {
    status: 401,
    description: 'Unauthorized, you need to login first',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  };

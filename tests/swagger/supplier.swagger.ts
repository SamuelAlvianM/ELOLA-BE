import { ApiResponseOptions } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { CreateSupplierDto, UpdateSupplierDto } from '../../src/supplier/dto/supplier.dto';

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

// GET all suppliers response
export const get_all_suppliers_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all suppliers',
  isArray: true,
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Supplier data fetched successfully' },
      data: { type: 'array', items: { $ref: '#/components/schemas/CreateSupplierDto' } },
    },
  },
};

export const get_all_suppliers_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching all suppliers',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching all suppliers' },
    },
  },
};

// POST create a new supplier
export const create_supplier_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully created supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Supplier data created successfully' },
      data: { $ref: '#/components/schemas/CreateSupplierDto' },
    },
  },
};

export const create_supplier_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when creating supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating supplier' },
    },
  },
};

// GET a single supplier by ID
export const get_supplier_id_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched supplier by id',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Supplier data fetched successfully' },
      data: { $ref: '#/components/schemas/CreateSupplierDto' },
    },
  },
};

export const get_supplier_id_bad_req_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching supplier' },
    },
  },
};

// DELETE a supplier
export const delete_supplier_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully deleted supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Supplier data deleted successfully' },
      data: { type: 'object', additionalProperties: true },
    },
  },
};

export const delete_supplier_bad_req_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when deleting supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting supplier' },
    },
  },
};

// PUT update a supplier
export const update_supplier_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully updated supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Supplier data updated successfully' },
      data: { $ref: '#/components/schemas/UpdateSupplierDto' },
    },
  },
};

export const update_supplier_bad_req_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when updating supplier',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when updating supplier' },
    },
  },
};

// Unauthorized response
export const unauthorized_response: ApiResponseOptions = {
  status: 401,
  description: 'Unauthorized',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 401 },
      message: { type: 'string', example: 'Unauthorized' },
    },
  },
};

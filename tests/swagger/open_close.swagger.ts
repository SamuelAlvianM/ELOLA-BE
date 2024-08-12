/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

// Define the schemas in your Swagger configuration
export const open_close_schema = {
  components: {
    schemas: {
      HandleOpenCloseDto: {
        type: 'object',
        properties: {
          user_id: { type: 'number', example: 1 },
          store_id: { type: 'number', example: 1 },
          is_cashier_open: { type: 'boolean', example: true },
          open_by: { type: 'number', example: 1 },
          open_date: { type: 'string', format: 'date-time', example: '2024-08-12T00:00:00.000Z' },
          close_by: { type: 'number', example: 1 },
          close_date: { type: 'string', format: 'date-time', example: '2024-08-12T00:00:00.000Z' },
          bill_quantity: { type: 'number', example: 5 }, // Example count of transactions
        },
      },
      // Define other schemas here if needed
    },
  },
};

// Unauthorized role response
export const unauthorized_role_response: ApiResponseOptions = {
  status: HttpStatus.FORBIDDEN,
  description: 'Forbidden: User does not have the required role',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 403 },
      message: { type: 'string', example: 'Forbidden resource, you must be an owner or admin to access this resource' },
      error: { type: 'string', example: 'Forbidden' },
    },
  },
};

// GET all open/close sessions response
export const get_all_open_close_sessions_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all open/close sessions',
  isArray: true,
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Successfully fetched all open/close sessions' },
      data: { type: 'array', items: { $ref: '#/components/schemas/HandleOpenCloseDto' } },
    },
  },
};

// GET open/close session by ID response
export const get_open_close_session_by_id_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully fetched open/close session by ID',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Successfully fetched open/close session' },
      data: { $ref: '#/components/schemas/HandleOpenCloseDto' },
    },
  },
};

// POST create a new open/close session response
export const create_open_close_session_response: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Successfully created open/close session',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Created new open/close session' },
      data: { $ref: '#/components/schemas/HandleOpenCloseDto' },
    },
  },
};

// PATCH update an open/close session response
export const update_open_close_session_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully updated open/close session',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Successfully updated open/close session' },
      data: { $ref: '#/components/schemas/HandleOpenCloseDto' },
    },
  },
};

// DELETE open/close session response
export const delete_open_close_session_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully deleted open/close session',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 204 },
      message: { type: 'string', example: 'Successfully deleted open/close session' },
      data: { $ref: '#/components/schemas/HandleOpenCloseDto' },
    },
  },
};

// Bad request responses for each operation
export const bad_request_response = (operation: string): ApiResponseOptions => ({
  status: HttpStatus.BAD_REQUEST,
  description: `Error when ${operation} open/close session`,
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: `Error when ${operation} open/close session` },
    },
  },
});

// Unauthorized response
export const unauthorized_response: ApiResponseOptions = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized, you need to login first',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 401 },
      message: { type: 'string', example: 'Unauthorized' },
    },
  },
};

import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

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

// GET all promos response
export const get_all_promos_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all promo data',
  isArray: true,
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Successfully fetched all promos' },
      data: { type: 'array', items: { $ref: '#/components/schemas/CreatePromoDto' } },
    },
  },
};

export const get_all_promo_bad_request_response: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Error when fetching all promos',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching all promos' },
    },
  },
};

// POST create a new promo
export const create_promo_response: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Successfully created promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Created new promo' },
      data: { $ref: '#/components/schemas/CreatePromoDto' },
    },
  },
};

export const create_promo_bad_request_response: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Error when creating promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating promo' },
    },
  },
};

// GET a single promo by ID
export const get_promo_by_id_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully fetched promo by ID',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Successfully fetched promo' },
      data: { $ref: '#/components/schemas/CreatePromoDto' },
    },
  },
};

export const get_promo_by_id_bad_request_response: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Error when fetching promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching promo' },
    },
  },
};

export const update_promo_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully updated promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Successfully updated promo' },
      data: { $ref: '#/components/schemas/UpdatePromoDto' },
    },
  },
};

export const update_promo_bad_request_response: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Error when updating promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when updating promo' },
    },
  },
};

// Apply promo response
export const apply_promo_response: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Promo applied successfully',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Promo applied successfully' },
      data: { $ref: '#/components/schemas/ApplyPromoDto' },
    },
  },
};

export const apply_promo_bad_request_response: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Error applying promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error applying promo' },
    },
  },
};

export const delete_promo_response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Successfully deleted promo',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 204 },
        message: { type: 'string', example: 'Delete Data Promo Success!' },
        data: { $ref: '#/components/schemas/CreatePromoDto' },
      },
    },
}

export const delete_promo_bad_request_response: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Error when deleting promo',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting promo' },
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

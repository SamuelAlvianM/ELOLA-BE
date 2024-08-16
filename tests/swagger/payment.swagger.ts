/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePayment, UpdatePayment } from '../../src/Payment/dto/Payment.dto';

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

// GET all payments response
export const get_all_payments_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all payments',
  isArray: true,
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully fetched all payments' },
      data: { type: 'array', items: { $ref: '#/components/schemas/CreatePayment' } },
    },
  },
};

export const get_all_payments_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching all payments',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching all payments' },
    },
  },
};

// POST create a new Payment
export const create_Payment_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully created Payment',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 201 },
      response: { type: 'string', example: 'Created new Payment' },
      data: { $ref: '#/components/schemas/CreatePayment' },
    },
  },
};

export const create_Payment_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when creating Payment',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating Payment' },
    },
  },
};

// GET a single Payment by ID
export const get_Payment_by_id_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched Payment by id',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully fetched Payment' },
      data: { $ref: '#/components/schemas/CreatePaymentDto' },
    },
  },
};

export const get_Payment_by_id_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching Payment',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching Payment' },
    },
  },
};

// PATCH update an Payment
export const update_Payment_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully updated Payment',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully updated Payment' },
      data: { $ref: '#/components/schemas/UpdatePayment' },
    },
  },
};

export const update_Payment_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when updating Payment',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when updating Payment' },
    },
  },
};

// DELETE soft delete an Payment
export const delete_Payment_response: ApiResponseOptions = {
  status: 204,
  description: 'Successfully deleted Payment',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 204 },
      response: { type: 'string', example: 'Delete Data Payment Success!' },
      data: { $ref: '#/components/schemas/CreatePaymentDto' },
    },
  },
};

export const delete_Payment_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when deleting Payment',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting Payment' },
    },
  },
};

export const unauthorized_response: ApiResponseOptions = {
    status: 401,
    description: 'Unauthorized! You need to login first',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  };

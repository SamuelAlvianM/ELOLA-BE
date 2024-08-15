/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreatePayment, UpdatePayment } from './../../src/payment/dto/payment.dto';

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

// GET ALL PAYMENT DATA RESPONSE
export const get_all_payments_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Fetching All data Payment Success! ',
  isArray: true,
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Fetching All data Payment Success!' },
      data: { type: 'array', items: { $ref: '#/components/schemas/CreatePayment' } },
    },
  },
};

export const get_all_payments_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching payment data',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching payment data' },
    },
  },
};

// POST CREATE NEW PAYMENT
export const create_payments_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully Created New Payment Method!',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 201 },
      response: { type: 'string', example: 'Created New Payment Method Success!' },
      data: { $ref: '#/components/schemas/CreatePayment' },
    },
  },
};

export const create_payments_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when creating payment data',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating payment data' },
    },
  },
};

// GET Payment Data using Payment ID
export const get_payments_by_id_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched payments data by id',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Successfully fetched payments data by id' },
      data: { $ref: '#/components/schemas/CreatePayment' },
    },
  },
};

export const get_payments_by_id_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching payment data',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching payment data' },
    },
  },
};

// Update Payment Method using Payment ID
export const update_payments_response: ApiResponseOptions = {
  status: 200,
  description: 'Update Data Payment Success!',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 200 },
      response: { type: 'string', example: 'Update Data Payment Success!' },
      data: { $ref: '#/components/schemas/UpdatePayment' },
    },
  },
};

export const update_payments_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when updating data payment!',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when updating data payment!' },
    },
  },
};

// SOFT DELETE DATA PAYMENT
export const delete_payments_response: ApiResponseOptions = {
  status: 204,
  description: 'Delete Data Payment Success!',
  schema: {
    type: 'object',
    properties: {
      StatusCode: { type: 'number', example: 204 },
      response: { type: 'string', example: 'Delete Data Payment Success!' },
      data: { $ref: '#/components/schemas/CreatePayment' },
    },
  },
};

export const delete_payments_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when deleting data payment',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting data payment' },
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

/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from '@nestjs/swagger';
import { CreateTransactionDto } from '../../src/transactions/dto/transaction.dto';
import { DateRangeDto } from '../../src/transactions/dto/dateRange.dto';
import { Order_payment_type } from '@prisma/client';

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
  
  // Forbidden response (for role-based access)
  export const forbidden_role_response: ApiResponseOptions = {
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

export const create_transaction_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully Created Transaction Data!',
  type: CreateTransactionDto,
};

export const create_transaction_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Invalid data',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Invalid data' },
    },
  },
};

export const create_transaction_unauthorized_response: ApiResponseOptions = {
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

export const find_by_store_id_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched transactions by store ID',
  type: CreateTransactionDto,
  isArray: true,
};

export const find_by_store_id_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error fetching transactions by store ID',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error fetching transactions by store ID' },
    },
  },
};

export const find_by_payment_type_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched transactions by payment type',
  type: CreateTransactionDto,
  isArray: true,
};

export const find_by_payment_type_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error fetching transactions by payment type',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error fetching transactions by payment type' },
    },
  },
};

export const find_by_date_range_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched transactions by date range',
  type: CreateTransactionDto,
  isArray: true,
};

export const find_by_date_range_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error fetching transactions by date range',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error fetching transactions by date range' },
    },
  },
};

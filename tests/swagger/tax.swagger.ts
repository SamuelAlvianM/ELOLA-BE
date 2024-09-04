/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from "@nestjs/swagger";

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

  export const unauthorized_response: ApiResponseOptions = {
    status: 401,
    description: 'Unauthorized response, you need to login correctly',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' },
      },
    },
  };

  export const not_found_response: ApiResponseOptions = {
    status: 404,
    description: 'endpoint not found response',
    schema: {
        type: 'object',
        properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Sorry, request resource Not Found' },
        error: { type: 'string', example: 'Sorry, request resource Not Found' },
        },
    }
};

export const bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Bad Request response',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 400 },
            message: { type: 'string', example: 'Bad Request' },
            error: { type: 'string', example: 'Something went wrong, please try again with valid data' },
        },
    },
};


export const get_all_tax_response: ApiResponseOptions = {
    status: 200,
    description: 'Get all tax information from store',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully fetched all taxes' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        tax_type: { type: 'enum', example: 'Service' },
                        tax_name: { type: 'string', example: 'service' },
                        tax_value: { type: 'number', example: 20 },
                        tax_status: { type: 'boolean', example: true },
                    },
                },
            },
        },
    },
};

export const get_tax_by_id_response: ApiResponseOptions = {
    status: 200,
    description: 'Get tax data by id response',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully fetched tax by id' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        tax_type: { type: 'enum', example: 'Service' },
                        tax_name: { type: 'string', example: 'service merchant' },
                        tax_value: { type: 'number', example: 20 },
                        tax_status: { type: 'boolean', example: true },
                    },
                },
            },
        },
    },
};


export const update_tax_response: ApiResponseOptions = {
    status: 200,
    description: 'update tax data response',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully updated tax' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        tax_type: { type: 'enum', example: 'VAT' },
                        tax_name: { type: 'string', example: 'service merchant' },
                        tax_value: { type: 'number', example: 40 },
                        tax_status: { type: 'boolean', example: false },
                    },
                },
            },
        },
    },
};

export const create_tax_response: ApiResponseOptions = {
    status: 201,
    description: 'Create new data tax',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 201 },
            message: { type: 'string', example: 'Successfully created tax' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        tax_type: { type: 'enum', example: 'Service' },
                        tax_name: { type: 'string', example: 'service merchant' },
                        tax_value: { type: 'number', example: 40 },
                        tax_status: { type: 'boolean', example: false },
                    },
                },
            },
        },
    },
};

export const delete_tax_response: ApiResponseOptions = {
    status: 200,
    description: 'delete tax data from database',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully deleted tax' },
            data: { type: 'object', additionalProperties: true },
        },
    },
};
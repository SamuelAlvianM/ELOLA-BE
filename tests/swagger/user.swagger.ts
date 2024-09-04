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

  export const create_user_response: ApiResponseOptions = {
    status: 201,
    description: 'Successfully created new User',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 201 },
            message: { type: 'string', example: 'Successfully Created new User' },
            data: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    email: { type: 'string', example: 'user@example.com' },
                    role: { type: 'string', example: 'STAFF' },
                },
            },
        },
    },
};

export const get_all_users_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully retrieved all data users',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully retrieved all data users' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 1 },
                        email: { type: 'string', example: 'user@example.com' },
                        role: { type: 'string', example: 'USER' },
                    },
                },
            },
        },
    },
};

export const get_user_by_id_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully fetched user by id',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully fetched user by id' },
            data: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    email: { type: 'string', example: 'user@example.com' },
                    role: { type: 'string', example: 'USER' },
                },
            },
        },
    },
};

export const update_user_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully updated user data',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Data Update Success!' },
            data: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    email: { type: 'string', example: 'thisuser@example.com' },
                    role: { type: 'string', example: 'OWNER' },
                },
            },
        },
    },
};

export const delete_user_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully deleted user',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 200 },
            message: { type: 'string', example: 'Successfully deleted user' },
            data: { type: 'object', additionalProperties: true },
        },
    },
};

export const bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Bad Request',
    schema: {
        type: 'object',
        properties: {
            statusCode: { type: 'number', example: 400 },
            message: { type: 'string', example: 'Bad Request' },
            error: { type: 'string', example: 'Something went wrong, please try again with valid data' },
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

  export const not_found_response: ApiResponseOptions = {
    status: 404,
    description: 'Sorry, request resource Not Found',
    schema: {
        type: 'object',
        properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Sorry, request resource Not Found' },
        error: { type: 'string', example: 'Sorry, request resource Not Found' },
        },
    }
};
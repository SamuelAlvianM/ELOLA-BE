/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from "@nestjs/swagger";
import { Update_DP_Dto, Create_DP_Dto } from '../../../src/driver_partner/dto/dp.dto';
import { HttpStatus } from "@nestjs/common";

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

export const get_all_dp_response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Successfully retrieved all data from driver partner',
    type: Create_DP_Dto,
    isArray: true,
};

export const get_all_dp_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when fetching all driver partners',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when fetching all driver partners' },
      },
    },
  };
  
  // GET a single driver partner
  export const det_dp_by_id_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully fetched driver partner by id',
    type: Create_DP_Dto,
  };
  
  export const det_dp_by_id_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when fetching driver partner',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when fetching driver partner' },
      },
    },
  };
  
  // POST create a new driver partner
  export const create_dp_response: ApiResponseOptions = {
    status: 201,
    description: 'Successfully created driver partner',
    type: Create_DP_Dto,
  };
  
  export const create_dp_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when creating driver partner',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when creating driver partner' },
      },
    },
  };
  
  // PATCH update a driver partner
  export const update_dp_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully updated driver partner',
    type: Update_DP_Dto,
  };
  
  export const update_dp_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when updating driver partner',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when updating driver partner' },
      },
    },
  };
  
  // DELETE a driver partner
  export const delete_dp_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully deleted driver partner',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully deleted driver partner' },
        data: { type: 'object', additionalProperties: true },
      },
    },
  };
  
  export const delete_dp_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when deleting driver partner',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when deleting driver partner' },
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
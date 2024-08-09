import { ApiResponseOptions } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { Create_Store_Dto, Update_Store_Dto, Invite_User_Dto } from '../../src/store/dto/store.dto';


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
  
  // GET all stores response
  export const get_all_stores_response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Successfully retrieved all stores',
    isArray: true,
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully fetched all stores' },
        data: { type: 'array', items: { $ref: '#/components/schemas/Create_Store_Dto' } },
      },
    },
  };
  
  export const get_all_stores_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when fetching all stores',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when fetching all stores' },
      },
    },
  };
  
  // POST create a new store
  export const create_store_response: ApiResponseOptions = {
    status: 201,
    description: 'Successfully created store',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 201 },
        response: { type: 'string', example: 'Created new Store' },
        data: { $ref: '#/components/schemas/Create_Store_Dto' },
      },
    },
  };
  
  export const create_store_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when creating store',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when creating store' },
      },
    },
  };
  
  // GET a single store by ID
  export const get_store_by_id_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully fetched store by id',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully fetched Store' },
        data: { $ref: '#/components/schemas/Create_Store_Dto' },
      },
    },
  };

  export const get_staff_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully fetched all staff in store',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully fetched Staffs' },
        data: { $ref: '#/components/schemas/Invite_User_Dto' },
      },
    },
  };

  export const get_staff_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when fetching staffs',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when fetching staffs data' },
      },
    },
  };
  
  export const get_store_by_id_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when fetching store',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when fetching store' },
      },
    },
  };
  
  // PATCH update a store
  export const update_store_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully updated store',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully updated store' },
        data: { $ref: '#/components/schemas/Update_Store_Dto' },
      },
    },
  };
  
  export const update_store_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when updating store',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when updating store' },
      },
    },
  };
  
  // DELETE a store
  export const delete_store_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully deleted store',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully deleted store' },
        data: { type: 'object', additionalProperties: true },
      },
    },
  };

  export const delete_store_staff_response: ApiResponseOptions = {
    status: 200,
    description: 'Successfully deleted staff from store',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 200 },
        response: { type: 'string', example: 'Successfully deleted staff from store' },
        data: { type: 'object', additionalProperties: true },
      },
    },
  };
  
  export const delete_store_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when deleting store',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when deleting store' },
      },
    },
  };

  export const delete_store_staff_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when deleting staffs maybe check yout input first then try again',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when deleting staff' },
      },
    },
  };
  
  // POST invite a user to the store
  export const invite_user_response: ApiResponseOptions = {
    status: 201,
    description: 'Successfully invited user to store',
    schema: {
      type: 'object',
      properties: {
        StatusCode: { type: 'number', example: 201 },
        response: { type: 'string', example: 'Invited new Staff' },
        data: { $ref: '#/components/schemas/Invite_User_Dto' },
      },
    },
  };
  
  export const invite_user_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when inviting user to store',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when inviting user to store' },
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
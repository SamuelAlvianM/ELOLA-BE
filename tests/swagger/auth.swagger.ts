/* eslint-disable prettier/prettier */
import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { Super_Login, LoginDto, LoginStaffDto } from '../../src/auth/dto/login.dto';
import { HttpStatus } from "@nestjs/common";
import { UserDto } from '../../src/user/dto/user.dto';

// dto - dummy - login response

export class login_response_dto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: 'Successfully login ' })
    message: string;
  
    @ApiProperty({
      example: {
        access_token: 'your-jwt-token-shown-here',
      },
    })
    data: {
      access_token: string;
    };
  }

export const login_response: ApiResponseOptions = {
    status: 200,
    type: login_response_dto,
}


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
}


export const register_response: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'Successfully Register ',
    type: UserDto
}

export const bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Bad request for login and register',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Something went wrong' },
    },
  },
};
  
  
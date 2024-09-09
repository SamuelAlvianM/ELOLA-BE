import { HttpStatus } from '@nestjs/common';

export function successResponse(data: any, message: string = 'Success') {
  return {
    statusCode: HttpStatus.OK,
    message,
    data,
  };
}

export function errorResponse(statusCode: HttpStatus, message: string) {
  return {
    statusCode,
    message,
  };
}
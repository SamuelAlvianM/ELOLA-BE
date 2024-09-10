import { BadRequestException, HttpStatus, NotFoundException } from "@nestjs/common";
import { errorResponse } from "../response-handler";

export function checkIfUserExists(existingUser: any, user_dto: any): void {
    if (existingUser) {
      if (existingUser.email === user_dto.email) {
        throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Email ${user_dto.email} already exists`));
      }
      if (existingUser.user_name === user_dto.user_name) {
        throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Username ${user_dto.user_name} already exists`));
      }
    }
  }
  
  export function checkIfUserNotFound(user: any, user_id: number): void {
    if (!user) {
      throw new NotFoundException(errorResponse(HttpStatus.NOT_FOUND, `User with ID ${user_id} not found or has been deleted.`));
    }
  }
  
  export function checkForUpdateConflict(existingUser: any, update_dto: any): void {
    if (existingUser) {
      if (existingUser.email === update_dto.email) {
        throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Email ${update_dto.email} already exists`));
      }
      if (existingUser.user_name === update_dto.user_name) {
        throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST,  `Username ${update_dto.user_name} already exists`));
      }
    }
  }
  
  export function successResponse(data: any, message: string = 'Success') {
    return {
      statusCode: 200,
      message,
      data,
    };
  }
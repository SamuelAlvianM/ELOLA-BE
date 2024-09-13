import { errorResponse, successResponse } from '../response-handler';
import { CreateTransactionDto, UpdateTransactionDto } from 'src/transactions/dto/transaction.dto';
import { HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';

  export function checkIfTransactionNotFound(receipt_number: string): void {
    if (!receipt_number) {
      throw new NotFoundException(errorResponse(HttpStatus.NOT_FOUND, `Transaction with ID ${receipt_number} not found or has been deleted.`));
    }
  }

  export function checkIfDataIsMissing(receipt_number: string, create_dto: CreateTransactionDto): void {
    if (!receipt_number) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Receipt number is required`));
    }
    else if (!create_dto.payment_type) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Payment type is required`));
    }
    else if (!create_dto.sub_total) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Sub total is required`));
    }
 
    else if (!create_dto.grand_total) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Grand total is required`));
    }
  }

  export function checkFalseData(receipt_number: string, create_dto: CreateTransactionDto): void {
    if (receipt_number) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Receipt number ${receipt_number} already exists`));
    }
    else if (!create_dto.payment_type) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Payment type is required`));
    }
    else if (!create_dto.sub_total) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Sub total is required`));
    }
 
    else if (!create_dto.grand_total) {
      throw new BadRequestException(errorResponse(HttpStatus.BAD_REQUEST, `Grand total is required`));
    }
  }
  
  export function successResponseTransaction(data: any, message: string = 'Success') {
    return {
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }
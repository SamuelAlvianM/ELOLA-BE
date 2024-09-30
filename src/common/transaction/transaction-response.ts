import { errorResponse, successResponse } from '../response-handler';
import { Create_Order_Dto, Update_Order_Dto } from 'src/order/dto/order.dto';
import { HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';

  export function checkIfOrderNotFound(receipt_number: string): void {
    if (!receipt_number) {
      throw new NotFoundException(errorResponse(HttpStatus.NOT_FOUND, `Order with ID ${receipt_number} not found or has been deleted.`));
    }
  }

  export function checkIfDataIsMissing(receipt_number: string, create_dto: Create_Order_Dto): void {
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

  export function checkFalseData(receipt_number: string, create_dto: Create_Order_Dto): void {
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
  
  export function successResponseOrder(data: any, message: string = 'Success') {
    return {
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }
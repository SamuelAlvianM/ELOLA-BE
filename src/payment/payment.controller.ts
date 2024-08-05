/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UseGuards, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {CreatePayment, UpdatePayment } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { Payment, Role } from '@prisma/client';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse( {status: 201, description: 'Successfully created'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  async createPayment(@Body() data: CreatePayment) {
    try {
      return await this.paymentService.createPayment(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Failed to create payment');
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Payment Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get(':id')
  //Show Payment data by Id including delete payment data
  // async getPaymentById(@Param('id') id: string) {
  //   return this.paymentService.getPaymentById(+id);
  // }

  async getPaymentById(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.getPaymentById(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: 200, description: 'Fetch Data Payment Success'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  // Show All data Inclued Deleted data
  // async getAllPayments() {
  //   return this.paymentService.getAllPayments();
  // }
  async getAllPayments(): Promise<Payment[]>{
    return this.paymentService.getAllPayments();
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @ApiResponse( {status: 201, description: 'Update Data Payment Success!'})
  @ApiBadRequestResponse({status: 400, description: 'Invalid Data!'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Put(':id')
  async updatePayment(@Param('id') id: string, @Body() data: UpdatePayment) {
    return this.paymentService.updatePayment(+id, data);
  }

//   @Delete(':id')
//   async deletePayment(@Param('id') id: string) {
//     return this.paymentService.deletePayment(+id);
//   }
// }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 201, description: 'Data Payment Successfully Deleted!' })
  @ApiBadRequestResponse({status: 404, description: 'Not Found'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete(':id')
  async softDeletePayment(@Param('id') id: string) {
    const payment = await this.paymentService.softDeletePayment(+id);
    if (!payment) {
      throw new NotFoundException("Payment Data Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Payment Success!",
      data: payment,
    }
  }
}
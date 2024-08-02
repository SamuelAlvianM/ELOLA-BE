import { Controller, Post, Param, ParseIntPipe, UseGuards, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { OpenCloseService } from './open_close.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { User } from '../utils/decorator/user.decorator';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBadRequestResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('open-close')
@UseGuards(JwtAuthGuard)
export class OpenCloseController {
  constructor(private readonly  oc_service: OpenCloseService) {}

  @Post('open/:store_id') 
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( {status: 201, description: 'Successfully get open cashier'})
  @ApiBadRequestResponse({status: 400, description: 'error when opening cashier'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  async open_cashier(
    @Param('store_id') store_id: number,
    @Body() open_dto: Handle_Open_Close_Dto,
    @User() user: any,
  ) {
    const user_id = user.user_id;
    const result = await this.oc_service.handle_cashier_status(user_id, store_id, open_dto);

    return {
        status_code: HttpStatus.OK,
        Response: 'Cashier OPEN NOW',
        data: result,
    }
  }

  @Post('close/:store_id') 
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse( {status: 201, description: 'Successfully close cashier'})
  @ApiBadRequestResponse({status: 400, description: 'error when closing cashier'})
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
  async close_cashier(
    @Param('store_id') store_id: number,
    @Body() close_dto: Handle_Open_Close_Dto,
    @User() user: any,
  ) {
    const user_id = user.user_id;
    const result = await this.oc_service.handle_cashier_status(user_id, store_id, close_dto);

    return {
        status_code: HttpStatus.OK,
        Response: 'Cashier CLOSED NOW',
        data: result,
    }
  }

}

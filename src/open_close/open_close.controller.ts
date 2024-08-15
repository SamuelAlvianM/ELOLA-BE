/* eslint-disable prettier/prettier */
import {open_close_schema, unauthorized_response, unauthorized_role_response, get_all_open_close_sessions_response, get_open_close_session_by_id_response, create_open_close_session_response, update_open_close_session_response, delete_open_close_session_response, bad_request_response} from '../../tests/swagger/open_close.swagger';
import { Controller, Post, Param, ParseIntPipe, UseGuards, Body, Req, HttpCode, HttpStatus, Delete, BadRequestException, Get } from '@nestjs/common';
import { OpenCloseService } from './open_close.service';
import { JwtAuthGuard } from '../utils/guard/jwt.guard';
import { User } from '../utils/decorator/user.decorator';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Store Open & Close')
@Controller('open-close')
@UseGuards(JwtAuthGuard)
export class OpenCloseController {
  constructor(private readonly  oc_service: OpenCloseService) {}

  @Post('open/:store_id') 
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all open/close sessions' })
  @ApiResponse(get_all_open_close_sessions_response)
  @ApiResponse(bad_request_response('fetching all open/close sessions'))
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async open_cashier(
    @Param('store_id', ParseIntPipe) store_id: number,
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
  @ApiOperation({ summary: 'Create a new open/close session' })
  @ApiResponse(create_open_close_session_response)
  @ApiResponse(bad_request_response('creating open/close session'))
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async close_cashier(
    @Param('store_id', ParseIntPipe) store_id: number,
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

  @Get()
  @ApiOperation({ summary: 'Get all open/close session' })
  @ApiResponse(get_all_open_close_sessions_response)
  @ApiResponse(bad_request_response('Error when fetching all open/close sessions'))
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async getAllOpenCloseSessions(): Promise<{ status_code: number; message: string; data: Handle_Open_Close_Dto[] }> {
    try {
      const result = await this.oc_service.get_all_data_open_close();
      return {
        status_code: HttpStatus.OK,
        message: 'Successfully fetched all open/close sessions',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException('Error when fetching all open/close sessions');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an open/close session' })
  @ApiResponse(delete_open_close_session_response)
  @ApiResponse(bad_request_response('deleting open/close session'))
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async deleteOpenCloseSession(@Param('id') id: number): Promise<{ status_code: number; message: string }> {
    try {
      await this.oc_service.delete_data_open_close(+id);
      return {
        status_code: HttpStatus.OK,
        message: 'Successfully deleted open/close session',
      };
    } catch (error) {
      throw new BadRequestException('Error when deleting open/close session');
    }
  }


}

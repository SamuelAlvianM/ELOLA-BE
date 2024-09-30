import { Controller, Post, Body, Param, UseGuards, HttpCode, HttpStatus, Delete, Get } from '@nestjs/common';
import { OpenCloseService } from './open_close.service';
import { Handle_Open_Close_Dto } from './dto/oc.dto';
import { JwtAuthGuard } from '../utils/guard/jwt.guard'; 
import { User } from '../utils/decorator/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { bad_request_response, unauthorized_response, unauthorized_role_response } from '../../tests/swagger/open_close.swagger';
@Controller('cashier')
export class OpenCloseController {
  constructor(private readonly oc_service: OpenCloseService) {}

  @Post('open/:outlet_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Open cashier session' })
  @ApiResponse({ status: 200, description: 'Cashier opened successfully.' })
  @ApiResponse(bad_request_response('Opening cashier session failed'))
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async open_cashier(
    @Param('outlet_id') outlet_id: string,
    @Body() oc_dto: Handle_Open_Close_Dto,
    @User() user: any,
  ) {
    const user_id = user.user_id;
    const user_name = user.user_name;
    const result = await this.oc_service.handle_cashier_status(user_name, user_id, outlet_id, oc_dto);

    return {
      status_code: HttpStatus.OK,
      response: 'Cashier OPEN NOW',
      data: result,
    };
  }

  @Post('close/:outlet_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Close cashier session' })
  @ApiResponse({ status: 200, description: 'Cashier closed successfully.' })
  @ApiResponse(bad_request_response('Closing cashier session failed'))
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiBearerAuth('JWT')
  async close_cashier(
    @Param('outlet_id') outlet_id: string,
    @Body() oc_dto: Handle_Open_Close_Dto,
    @User() user: any,
  ) {
    const user_id = user.user_id;
    const user_name = user.user_name;
    const result = await this.oc_service.handle_cashier_status(user_name, user_id, outlet_id, oc_dto);

    return {
      status_code: HttpStatus.OK,
      response: 'Cashier CLOSED NOW',
      data: result,
    };
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all open/close sessions' })
  @ApiResponse({ status: 200, description: 'Fetched all open/close sessions successfully.' })
  @ApiResponse(bad_request_response('Fetching open/close sessions failed'))
  @ApiResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async get_all_open_close_sessions() {
    const result = await this.oc_service.get_all_data_open_close();
    return {
      status_code: HttpStatus.OK,
      data: result,
    };
  }

  @Delete('session/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an open/close session' })
  @ApiResponse({ status: 204, description: 'Deleted open/close session successfully.' })
  @ApiResponse(bad_request_response('Deleting open/close session failed'))
  @ApiResponse(unauthorized_response)
  @ApiBearerAuth('JWT')
  async delete_open_close_session(@Param('id') id: number) {
    await this.oc_service.delete_data_open_close(id);
    return {
      status_code: HttpStatus.NO_CONTENT,
    };
  }
}

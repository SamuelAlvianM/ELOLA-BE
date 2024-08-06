import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsInt } from 'class-validator';


export class Handle_Open_Close_Dto {

  @IsBoolean()
  @IsOptional()
  @ApiProperty({example: true})
  is_cashier_open?: boolean;
}
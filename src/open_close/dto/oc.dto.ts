import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsInt } from 'class-validator';


export class Handle_Open_Close_Dto {

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indicates if the cashier is open or not.',
    example: true,
    required: false,
  })
  is_cashier_open?: boolean;
}
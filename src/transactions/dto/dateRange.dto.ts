import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateRangeDto {
  @IsDateString()
  @ApiProperty({example: "2022-01-01T00:00:00.000Z"})
  startDate: string;

  @IsDateString()
  @ApiProperty({example: "2022-01-01T00:00:00.000Z"})
  endDate: string;
}

import { IsOptional, IsBoolean, IsInt } from 'class-validator';


export class Handle_Open_Close_Dto {

  @IsBoolean()
  @IsOptional()
  is_cashier_open?: boolean;
}
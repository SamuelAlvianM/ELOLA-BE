import { IsInt, IsOptional, IsString, IsEnum, ValidateIf, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Order_type } from '@prisma/client';

export class CreateOrderDto {

  @IsEnum(Order_type)
  order_type: Order_type;

  @IsString()
  customer_name: string;

  @ValidateIf(o => o.order_type === Order_type.RETAIL)
  @IsString()
  @IsNotEmpty()
  wa_number?: string;

  @ValidateIf(o => o.order_type === Order_type.TAKEAWAY)
  @IsInt()
  @IsNotEmpty()
  driver_partner_id?: number;

}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
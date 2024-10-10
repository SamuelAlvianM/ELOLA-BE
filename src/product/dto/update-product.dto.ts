import { PartialType } from '@nestjs/mapped-types';
import { Create_Product_Dto } from './product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class Update_Product_Dto extends PartialType(Create_Product_Dto) {}

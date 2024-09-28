import { PartialType } from "@nestjs/swagger";
import { IsInt, IsString, IsBoolean, IsNotEmpty, IsOptional, IsEmail } from "class-validator";
import { ApiProperty }  from "@nestjs/swagger"

export class Create_Branch_Dto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "elola ID"})
    branch_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Jalan Utama Kopo, Bandung"})
    branch_address: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "elola.id@gmail.com"})
    branch_email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "+627256651234"})
    branch_phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "your map location"})
    branch_area: string;
    
}


export class Update_Branch_Dto extends PartialType(Create_Branch_Dto){}
import { PartialType } from "@nestjs/swagger";
import { IsInt, IsString, IsBoolean, IsNotEmpty, IsOptional, IsEmail } from "class-validator";
import { ApiProperty }  from "@nestjs/swagger"

export class Create_Company_Dto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "elola ID"})
    company_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Jordan"})
    company_owner: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Jalan Utama Kopo, Bandung"})
    company_address: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "elola.id@gmail.com"})
    company_email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "+627256651234"})
    company_phone: string;
    
}


export class Update_Company_Dto extends PartialType(Create_Company_Dto){}
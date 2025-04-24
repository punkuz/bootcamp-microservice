import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  ArrayMinSize,
} from "class-validator";

export class CreateBootcampDto {
  // @IsNotEmpty()
  // userId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsPhoneNumber("NP")
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  careers: string[];

  @IsOptional()
  @IsBoolean()
  housing?: boolean;

  @IsOptional()
  @IsBoolean()
  jobAssistance?: boolean;

  @IsOptional()
  @IsBoolean()
  jobGuarantee?: boolean;

  @IsOptional()
  @IsBoolean()
  acceptGi?: boolean;
}

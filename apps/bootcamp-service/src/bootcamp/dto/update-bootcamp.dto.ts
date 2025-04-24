import {
  IsOptional,
  IsUrl,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  ArrayMinSize,
} from "class-validator";

export class UpdateBootcampDto {
  id: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @ArrayMinSize(1)
  careers?: string[];

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

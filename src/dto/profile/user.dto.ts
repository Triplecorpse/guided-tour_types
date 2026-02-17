import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UserDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  gender?: "male" | "female";

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsString()
  @IsOptional()
  locale?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  stripe_customer_id?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  phoneVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  google?: boolean;
}


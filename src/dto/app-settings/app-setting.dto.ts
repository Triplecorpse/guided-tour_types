import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AppSettingDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsNumber()
  resource?: number;
}


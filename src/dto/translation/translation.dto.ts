import { IsNumber, IsOptional, IsString } from "class-validator";

export class TranslationDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  language: string;
}


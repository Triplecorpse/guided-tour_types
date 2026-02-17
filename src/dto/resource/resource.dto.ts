import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { TranslationDto } from "../translation/translation.dto";

function transformUrl({ value }: { value: unknown }) {
  if (!value || typeof value !== "string") {
    return null;
  }
  const v = value.trim().replace(/\s+/g, " ");
  const q = v.indexOf("?");
  return q === -1 ? v : v.substring(0, q);
}

export class ResourceDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  file_size?: number;

  @IsString()
  @IsOptional()
  file_type?: string;

  @IsBoolean()
  @IsOptional()
  is_wallpaper?: boolean;

  @IsBoolean()
  @IsOptional()
  is_published?: boolean;

  @IsBoolean()
  @IsOptional()
  is_public?: boolean;

  @Transform(transformUrl)
  @IsUrl()
  @IsOptional()
  url?: string;

  @Transform(transformUrl)
  @IsUrl()
  @IsOptional()
  preview_url?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  @IsOptional()
  translations?: TranslationDto[];

  @IsString()
  @IsOptional()
  created_at?: string;

  @IsString()
  @IsOptional()
  updated_at?: string;

  @IsString()
  @IsOptional()
  url_signed_until?: string;
}


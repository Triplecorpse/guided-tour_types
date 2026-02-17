import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ResourceDto } from "../resource/resource.dto";
import { TranslationDto } from "../translation/translation.dto";

export class AppSettingsDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  banner_resources?: ResourceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  collection_resources?: ResourceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  about_site?: TranslationDto[] | TranslationDto;
}


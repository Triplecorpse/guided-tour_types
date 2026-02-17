import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { TranslationDto } from "../translation/translation.dto";
import { ResourceDto } from "../resource/resource.dto";
import { CollectionDto } from "../collection/collection.dto";

export class PoiDto {
  @IsNumber()
  @IsOptional()
  readonly id?: number;

  @IsOptional()
  @IsNumber()
  readonly longitude?: number;

  @IsOptional()
  @IsNumber()
  readonly latitude?: number;

  @IsOptional()
  @IsNumber()
  readonly timeToVisit?: number;

  @IsOptional()
  @IsString()
  readonly website?: string;

  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsBoolean()
  readonly isPublished?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations?: TranslationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources: ResourceDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CollectionDto)
  collections?: CollectionDto[];

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsString()
  @IsOptional()
  updatedAt?: string;
}


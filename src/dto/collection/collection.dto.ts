import { Transform } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { PoiDto } from "../poi/poi.dto";

function sanitizeUserInput(value: string): string {
  if (!value || typeof value !== "string") return value;
  return value.trim().replace(/[<>]/g, "");
}

export class CollectionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => sanitizeUserInput(value))
  name?: string;

  @IsUrl()
  @IsOptional()
  preview_url?: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsArray()
  @IsOptional()
  pois?: PoiDto[];
}


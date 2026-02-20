import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  registerDecorator,
  ValidationOptions,
} from "class-validator";
import { Type } from "class-transformer";
import { TranslationDto } from "../translation/translation.dto";
import { ResourceDto } from "../resource/resource.dto";
import { CollectionDto } from "../collection/collection.dto";
import {Point} from "geojson";

export function IsPoint(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isPoint",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            return false;
          }

          if (value.type !== "Point") {
            return false;
          }

          if (!Array.isArray(value.coordinates)) {
            return false;
          }

          // Support both 2D points [longitude, latitude] and 3D points [longitude, latitude, elevation]
          if (value.coordinates.length !== 2 && value.coordinates.length !== 3) {
            return false;
          }

          return value.coordinates.every((v: any) => typeof v === "number" && !isNaN(v));
        },
        defaultMessage() {
          return "geom must be a valid GeoJSON Point with coordinates array of 2 (longitude, latitude) or 3 (longitude, latitude, elevation) numeric values";
        },
      },
    });
  };
}

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
  @IsPoint()
  readonly geom?: Point;

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

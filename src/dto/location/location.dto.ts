import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  registerDecorator,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Type } from "class-transformer";
import { TranslationDto } from "../translation/translation.dto";
import { ResourceDto } from "../resource/resource.dto";
import { PriceDto } from "./price.dto";
import {MultiPolygon, Polygon} from "geojson";
import { PoiDto } from "../poi/poi.dto";

// Custom constraint for validating GeoJSON Polygon
@ValidatorConstraint({ name: "isValidPolygon", async: false })
export class IsPolygonConstraint implements ValidatorConstraintInterface {
  validate(geom: Polygon, args: ValidationArguments): boolean {
    if (!geom || typeof geom !== "object") return false;

    // Check if it's a Polygon
    if (geom.type !== "Polygon") return false;

    // Validate coordinates structure for Polygon
    return this.isValidPolygonCoordinates(geom.coordinates);
  }

  defaultMessage(args: ValidationArguments): string {
    return "geom must be a valid GeoJSON Polygon";
  }

  private isValidPolygonCoordinates(polygonCoords: number[][][]): boolean {
    if (!Array.isArray(polygonCoords) || polygonCoords.length === 0)
      return false;

    for (const ring of polygonCoords) {
      if (!this.isValidLinearRing(ring)) return false;
    }
    return true;
  }

  private isValidLinearRing(ring: number[][]): boolean {
    if (!Array.isArray(ring) || ring.length < 4) return false;

    // Check first and last coordinates match (closed ring)
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) return false;

    // Validate each coordinate pair
    for (const coord of ring) {
      if (
        !Array.isArray(coord) ||
        coord.length < 2 ||
        typeof coord[0] !== "number" ||
        typeof coord[1] !== "number"
      ) {
        return false;
      }
    }
    return true;
  }
}

// Custom decorator
export function IsPolygon(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPolygonConstraint,
    });
  };
}

export class LocationDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsOptional()
  prices?: PriceDto[];

  @IsBoolean()
  is_published: boolean;

  @IsBoolean()
  @IsOptional()
  is_purchased?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translations?: TranslationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResourceDto)
  resources: ResourceDto[];

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  region_ids?: number[];

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  stripe_product_id?: string | null;

  @IsBoolean()
  @IsOptional()
  is_geom_set?: boolean;

  @IsOptional()
  @IsPolygon()
  geom?: Polygon;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PoiDto)
  @IsOptional()
  pois?: PoiDto[];
}

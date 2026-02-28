import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { TranslationDto } from "../translation/translation.dto";
import { ResourceDto } from "../resource/resource.dto";
import { PriceDto } from "./price.dto";
import { Polygon } from "geojson";
import { PoiDto } from "../poi/poi.dto";
export declare class IsPolygonConstraint implements ValidatorConstraintInterface {
    validate(geom: Polygon, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
    private isValidPolygonCoordinates;
    private isValidLinearRing;
}
export declare function IsPolygon(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class LocationDto {
    id?: number;
    price?: number;
    prices?: PriceDto[];
    is_published: boolean;
    is_purchased?: boolean;
    translations?: TranslationDto[];
    resources: ResourceDto[];
    region_ids?: number[];
    title?: string;
    description?: string;
    stripe_product_id?: string | null;
    is_geom_set?: boolean;
    geom?: Polygon;
    pois?: PoiDto[];
}

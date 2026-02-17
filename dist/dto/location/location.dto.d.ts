import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { TranslationDto } from "../translation/translation.dto";
import { ResourceDto } from "../resource/resource.dto";
import { PriceDto } from "./price.dto";
import { MultiPolygon } from "geojson";
import { PoiDto } from "../poi/poi.dto";
export declare class IsMultiPolygonConstraint implements ValidatorConstraintInterface {
    validate(geom: MultiPolygon, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
    private isValidMultiPolygonCoordinates;
    private isValidPolygonCoordinates;
    private isValidLinearRing;
}
export declare function IsMultiPolygon(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
export declare class LocationDto {
    id?: number;
    price: number;
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
    geom?: MultiPolygon;
    pois?: PoiDto[];
}

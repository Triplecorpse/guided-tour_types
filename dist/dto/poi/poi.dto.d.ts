import { ValidationOptions } from "class-validator";
import { TranslationDto } from "../translation/translation.dto";
import { ResourceDto } from "../resource/resource.dto";
import { CollectionDto } from "../collection/collection.dto";
import { Point } from "geojson";
export declare function IsPoint(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare class PoiDto {
    readonly id?: number;
    readonly longitude?: number;
    readonly latitude?: number;
    readonly geom?: Point;
    readonly timeToVisit?: number;
    readonly website?: string;
    readonly title?: string;
    readonly description?: string;
    readonly isPublished?: boolean;
    translations?: TranslationDto[];
    resources: ResourceDto[];
    collections?: CollectionDto[];
    createdAt?: string;
    updatedAt?: string;
}

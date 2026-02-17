import { PoiDto } from "../poi/poi.dto";
export declare class CollectionDto {
    id?: number;
    name?: string;
    preview_url?: string;
    url?: string;
    pois?: PoiDto[];
}

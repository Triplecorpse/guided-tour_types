import { LocationDto } from "../location/location.dto";
export declare class CheckoutInputDto {
    item: LocationDto;
    success_url: string;
    cancel_url: string;
}

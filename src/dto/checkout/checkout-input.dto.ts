import { IsNotEmpty, IsString } from "class-validator";
import { LocationDto } from "../location/location.dto";

export class CheckoutInputDto {
  @IsNotEmpty()
  item: LocationDto;

  @IsString()
  @IsNotEmpty()
  success_url: string;

  @IsString()
  @IsNotEmpty()
  cancel_url: string;
}


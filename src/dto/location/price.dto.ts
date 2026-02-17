import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class PriceDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  @IsOptional()
  interval?: "month" | "year";

  @IsString()
  @IsOptional()
  stripe_price_id?: string | null;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  @IsOptional()
  created_at?: string;

  @IsString()
  @IsOptional()
  updated_at?: string;
}


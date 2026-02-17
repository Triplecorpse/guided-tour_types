import { IsArray, IsNumber, IsIn, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AreaItem {
  @IsNumber()
  id: number;

  @IsIn(["country", "region"])
  adm: "country" | "region";
}

export class GetPoisDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AreaItem)
  areas: AreaItem[];
}


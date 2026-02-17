import { IsNotEmpty, IsString } from "class-validator";

export class VerifySessionInputDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;
}


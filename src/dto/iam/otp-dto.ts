import { IsNotEmpty, IsString } from "class-validator";

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsNotEmpty()
  identifier: string;
}

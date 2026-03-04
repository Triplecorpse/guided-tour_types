import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";

export class InitiateAuthAttemptDto {
  @IsNotEmpty()
  @IsEmail()
  identifier: string;

  @IsBoolean()
  agreeToTnC: boolean;
}

import { IsString } from "class-validator";

export class DeleteUserRequestDto {
  @IsString()
  token: string;

  @IsString()
  code: string;
}


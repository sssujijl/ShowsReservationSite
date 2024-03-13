import { PickType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class SignUpUserDto extends PickType(User, [
  "name",
  "email",
  "password",
  "phone",
]) {
  @IsString()
  @IsNotEmpty({ message: "비밀번호 확인을 입력해주세요." })
  readonly checkPassword: string;

  @IsBoolean()
  admin: boolean = false;
}

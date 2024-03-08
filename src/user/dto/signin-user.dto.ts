import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PickType } from '@nestjs/mapped-types';
import { SignUpUserDto } from "./signup-user.dto";

export class SignInUserDto extends PickType(SignUpUserDto, ['email', 'password']) {}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { validate } from 'class-validator';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/signup')
  signup(
    @Body() signUpUserDto: SignUpUserDto,
    @Query('admin') admin?: boolean
  ) {
    validate(signUpUserDto)

    if (admin) {
      signUpUserDto.admin = true;
    }

    return this.userService.signup(signUpUserDto);
  }

  @Post('/signin')
  signin(@Body() signInUserDto: SignInUserDto) {
    validate(signInUserDto)

    return this.userService.signin(signInUserDto);
  }
}

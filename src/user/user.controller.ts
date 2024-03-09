import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
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
  signin(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    validate(signInUserDto)

    return this.userService.signin(signInUserDto, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getEmail(@UserInfo() user: User) {

    const point = await this.userService.point(user.id);

    return {user, point};
  }
}


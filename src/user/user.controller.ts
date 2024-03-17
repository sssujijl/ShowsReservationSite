import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Res,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { validate } from "class-validator";
import { UserInfo } from "src/utils/userInfo.decorator";
import { SignInUserDto } from "./dto/signin-user.dto";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post("/signup")
  async signup(
    @Body() signUpUserDto: SignUpUserDto,
    @Query("admin") admin?: boolean,
  ) {
    validate(signUpUserDto);

    if (admin) {
      signUpUserDto.admin = true;
    }

    return await this.userService.signup(signUpUserDto);
  }

  @Post("/signin")
  async signin(@Body() signInUserDto: SignInUserDto, @Res() res: any) {
    try {
      validate(signInUserDto);

      const user = await this.userService.signin(signInUserDto);

      console.log(user);
      if ("email" in user) {
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);

        res.cookie("access_token", token, { httpOnly: true });
      }

      return res.json({ message: "로그인이 완료되었습니다." });
    } catch (error) {
      return res.json({ message: `${error.message}` });
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async getEmail(@UserInfo() user: User) {
    return { user };
  }
}

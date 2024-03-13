import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: any) => {
        const { access_token } = req.cookies;
        return access_token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET_KEY"),
    });
  }

  async validate(access_token: { email: string; id: number; iat: number }) {
    const user = await this.userService.findByEmail(access_token.email);

    if (!user) {
      throw new NotFoundException("해당하는 사용자를 찾을 수 없습니다.");
    }

    return user;
  }
}

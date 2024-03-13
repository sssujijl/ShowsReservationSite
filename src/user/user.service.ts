import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { SignInUserDto } from "./dto/signin-user.dto";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Point } from "../point/entites/point.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    private dataSource: DataSource,
  ) {}

  async signup(signUpUserDto: SignUpUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (signUpUserDto.password !== signUpUserDto.checkPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      const salt = await bcrypt.genSalt();
      signUpUserDto.password = await bcrypt.hash(signUpUserDto.password, salt);

      const user = await queryRunner.manager.save(User, signUpUserDto);

      if (user.admin === false) {
        await queryRunner.manager.save(Point, {
          userId: user.id,
          point: 1000000,
        });
      }

      await queryRunner.commitTransaction();
      return { message: "회원가입이 완료되었습니다." };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (
        error.message.includes("Duplicate entry") &&
        error.message.includes("@")
      ) {
        throw new ConflictException("이미 사용 중인 이메일 주소입니다.");
      } else if (
        error.message.includes("Duplicate entry") &&
        error.message.includes("010")
      ) {
        throw new ConflictException("이미 사용 중인 전화번호입니다.");
      } else {
        return { message: `${error}` };
      }
    } finally {
      await queryRunner.release();
    }
  }

  async signin(signInUserDto: SignInUserDto, res: any) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: signInUserDto.email },
        select: ["email", "password"],
      });

      if (!user) {
        throw new UnauthorizedException("존재하지 않는 이메일입니다.");
      } else if (
        !(await bcrypt.compare(signInUserDto.password, user.password))
      ) {
        throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");
      }

      const payload = { email: user.email, id: user.id };
      const token = this.jwtService.sign(payload);

      res.cookie("access_token", token, { httpOnly: true });

      return res.status(201).json({ messagage: "로그인이 완료되었습니다." });
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ["point"],
    });

    return user;
  }
}

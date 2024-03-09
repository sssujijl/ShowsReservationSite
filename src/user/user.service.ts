import { ConflictException, Injectable, InternalServerErrorException, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Point } from '../point/entites/point.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Point) private readonly pointRepository: Repository<Point>
  ) { }

  async signup(signUpUserDto: SignUpUserDto) {
    try {

      if (signUpUserDto.password !== signUpUserDto.checkPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      const salt = await bcrypt.genSalt();
      signUpUserDto.password = await bcrypt.hash(signUpUserDto.password, salt);

      const user = await this.userRepository.save(signUpUserDto);

      const initialPointValue = 1000000;
      const point = await this.pointRepository.save({
        userId: user.id,
        point: initialPointValue,
      });

      return { message: '회원가입이 완료되었습니다.' };

    } catch (error) {

      if (error.errno === 1062) {
        throw new ConflictException('이미 사용 중인 이메일 주소입니다.');
      } else {
        return { message: `${error}` };
      }
    }
  }

  async signin(signInUserDto: SignInUserDto, res: any) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: signInUserDto.email },
        select: ['email', 'password']
      });

      if (!user) {
        throw new UnauthorizedException('존재하지 않는 이메일입니다.');
      } else if (!(await bcrypt.compare(signInUserDto.password, user.password))) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }

      const payload = { email: user.email, id: user.id };
      const token = this.jwtService.sign(payload);

      res.cookie('access_token', token, { httpOnly: true });

      return res.status(201).json({ messagage: '로그인이 완료되었습니다.' });
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async point(userId: number) {
    return await this.pointRepository.findOne({
      where: {userId},
      select: ['point']
    });
  }
}
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async signup(signUpUserDto: SignUpUserDto) {
    try {

      if (signUpUserDto.password !== signUpUserDto.checkPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      const salt = await bcrypt.genSalt();
      signUpUserDto.password = await bcrypt.hash(signUpUserDto.password, salt);

      const user = await this.userRepository.save(signUpUserDto);

      return { message : '회원가입이 완료되었습니다.'};

    } catch (error) {

      if (error.errno === 1062) {
        throw new ConflictException('이미 사용 중인 이메일 주소입니다.');
      } else {
        return { message : `${error}` };
      }
    }
  }

  async signin(signInUserDto: SignInUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {email: signInUserDto.email}
      });

      if (!user) {
        throw new Error ('존재하지 않는 이메일입니다.');
      } else if (!(await bcrypt.compare(signInUserDto.password, user.password))) {
        throw new Error ('비밀번호가 일치하지 않습니다.');
      }
  
      return { message : '로그인이 완료되었습니다.'};
    } catch (error) {
      return { message: `${error}` };
    }
  }
  
}

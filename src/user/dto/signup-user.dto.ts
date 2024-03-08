import { IsBoolean, IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class SignUpUserDto {
    @IsString()
    @IsNotEmpty({ message: '이름을 입력해주세요.' })
    readonly name: string;

    @IsEmail()
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    readonly email: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호을 입력해주세요.' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호 확인을 입력해주세요.' })
    readonly checkPassword: string;

    @IsMobilePhone('ko-KR')
    @IsNotEmpty({ message: '전화번호를 입력해주세요.' })
    readonly phone: string;

    @IsBoolean()
    admin: boolean = false;
}

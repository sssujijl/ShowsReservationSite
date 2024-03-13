import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { Ticket } from "src/ticket/entities/ticket.entity";
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Point } from "../../point/entites/point.entity";

@Entity({ name: "users" })
@Unique(["email"])
@Unique(["phone"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column("varchar", { length: 30, nullable: false })
  @IsNotEmpty({ message: "이름을 입력해주세요." })
  name: string;

  @IsEmail()
  @Column("varchar", { length: 30, nullable: false })
  @IsNotEmpty({ message: "이메일을 입력해주세요." })
  email: string;

  @IsString()
  @Column("varchar", { select: false, nullable: false })
  @IsNotEmpty({ message: "비밀번호을 입력해주세요." })
  password: string;

  @IsMobilePhone("ko-KR")
  @Column("varchar", { nullable: false })
  @IsNotEmpty({ message: "전화번호를 입력해주세요." })
  phone: string;

  @IsBoolean()
  @Column("boolean", { default: false })
  admin: boolean;

  @OneToOne(() => Point, (point) => point.user)
  point: Point | null;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}

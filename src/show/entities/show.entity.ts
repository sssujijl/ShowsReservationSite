import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { Hall } from "src/hall/entities/hall.entity";
import { Round } from "src/round/entities/round.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "../types/showCategory.type";

@Entity({ name: "shows" })
@Unique([
  "title",
  "content",
  "category",
  "startDate",
  "endDate",
  "ticketingDate",
])
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: "varchar", nullable: false })
  @IsNotEmpty({ message: "공연 이름을 입력해주세요." })
  title: string;

  @IsString()
  @Column({ type: "varchar", nullable: false })
  @IsNotEmpty({ message: "공연 설명을 입력해주세요." })
  content: string;

  @IsEnum(Category, { message: "유효하지 않은 카테고리입니다." })
  @Column({ type: "enum", enum: Category, nullable: false })
  category: Category;

  @IsNumber()
  @Column({ type: "int", nullable: false })
  @IsNotEmpty({ message: "공연장을 입력해주세요." })
  hallId: number;

  @Column({ type: "date", nullable: false })
  @IsDateString({}, { message: "올바른 시작 날짜를 입력해주세요." })
  @IsNotEmpty({ message: "공연 시작 날짜를 입력해주세요." })
  startDate: Date;

  @Column({ type: "date", nullable: false })
  @IsDateString({}, { message: "올바른 종료 날짜를 입력해주세요." })
  @IsNotEmpty({ message: "공연 종료 날짜를 입력해주세요." })
  endDate: Date;

  @Column({ type: "datetime", nullable: false })
  @IsDateString({}, { message: "올바른 티켓 예매 날짜를 입력해주세요." })
  @IsNotEmpty({ message: "티켓팅 날짜를 입력해주세요." })
  ticketingDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Hall, (hall) => hall.shows)
  @JoinColumn({ name: "hallId", referencedColumnName: "id" })
  hall: Hall;

  @OneToMany(() => Round, (round) => round.show)
  rounds: Round[];
}

import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Hall } from "src/hall/entities/hall.entity";
import { RoundSeat } from "src/round_seat/entities/round_seat.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SeatClass } from "../types/seatClass.type";

@Entity({ name: "seats" })
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  hallId: number;

  @IsEnum(SeatClass, { message: "유효하지 않은 좌석 등급입니다." })
  @Column({ type: "enum", enum: SeatClass, nullable: false })
  @IsNotEmpty({ message: "좌석등급을 입력해주세요." })
  seatClass: SeatClass;

  @IsNumber()
  @Column({ type: "int", nullable: false })
  seatNumber: number;

  @ManyToOne(() => Hall, (hall) => hall.seats)
  @JoinColumn({ name: "hallId", referencedColumnName: "id" })
  hall: Hall;

  @OneToMany(() => RoundSeat, (roundSeat) => roundSeat.seat)
  roundSeats: RoundSeat[];
}

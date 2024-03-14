import { IsBoolean } from "class-validator";
import { RoundSeat } from "src/round_seat/entities/round_seat.entity";
import { User } from "src/user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tickets" })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "int", nullable: false })
  roundSeatId: number;

  @IsBoolean()
  @Column({ type: "boolean", default: true, nullable: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @OneToOne(() => RoundSeat, (roundSeat) => roundSeat.ticket)
  @JoinColumn({ name: "roundSeatId", referencedColumnName: "id" })
  roundSeat: RoundSeat;
}

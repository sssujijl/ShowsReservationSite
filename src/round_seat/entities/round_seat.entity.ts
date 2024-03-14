import { IsBoolean, IsNumber } from "class-validator";
import { Round } from "src/round/entities/round.entity";
import { Seat } from "src/seat/entities/seat.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "roundSeats" })
@Unique(["roundId", "seatId"])
export class RoundSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  roundId: number;

  @Column({ type: "int", nullable: false })
  seatId: number;

  @IsNumber()
  @Column({ type: "int", nullable: false })
  price: number;

  @IsBoolean()
  @Column({ type: "boolean", default: true, nullable: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Round, (round) => round.roundSeats)
  @JoinColumn({ name: "roundId", referencedColumnName: "id" })
  round: Round;

  @ManyToOne(() => Seat, (seat) => seat.roundSeats)
  @JoinColumn({ name: "seatId", referencedColumnName: "id" })
  seat: Seat;

  @OneToOne(() => Ticket, (ticket) => ticket.roundSeat)
  ticket: Ticket;
}

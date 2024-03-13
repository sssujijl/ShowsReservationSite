import { IsString } from "class-validator";
import { RoundSeat } from "src/round_seat/entities/round_seat.entity";
import { Show } from "src/show/entities/show.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "rounds" })
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  showId: number;

  @IsString()
  @Column({ type: "varchar", nullable: false })
  content: string;

  @Column({ type: "date", nullable: false })
  datetime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Show, (show) => show.rounds)
  @JoinColumn({ name: "showId", referencedColumnName: "id" })
  show: Show;

  @OneToMany(() => RoundSeat, (roundSeat) => roundSeat.round)
  roundSeats: RoundSeat[];
}

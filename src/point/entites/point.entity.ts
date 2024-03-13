import { IsNumber } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({ name: "points" })
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @Column("int", { select: false, nullable: false })
  userId: number;

  @IsNumber()
  @Column("int", { nullable: false })
  point: number;

  @OneToOne(() => User, (user) => user.point)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;
}

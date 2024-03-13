import { IsNotEmpty, IsString } from "class-validator";
import { Seat } from "src/seat/entities/seat.entity";
import { Show } from "src/show/entities/show.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity({ name: "halls" })
@Unique(["name"])
export class Hall {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column("varchar", { nullable: false })
  @IsNotEmpty({ message: "공연장을 입력해주세요." })
  name: string;

  @IsString()
  @Column("varchar", { nullable: false })
  @IsNotEmpty({ message: "주소를 입력해주세요." })
  address: string;

  @OneToMany(() => Seat, (seat) => seat.hall)
  seats: Seat[];

  @OneToMany(() => Show, (show) => show.hall)
  shows: Show[];
}

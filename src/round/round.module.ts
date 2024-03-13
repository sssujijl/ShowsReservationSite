import { Module } from "@nestjs/common";
import { RoundService } from "./round.service";
import { RoundController } from "./round.controller";
import { Round } from "./entities/round.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShowModule } from "src/show/show.module";
import { HallModule } from "src/hall/hall.module";
import { RoundSeatModule } from "src/round_seat/round_seat.module";
// import { ShowModule } from 'src/show/show.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Round]),
    ShowModule,
    HallModule,
    RoundSeatModule,
  ],
  controllers: [RoundController],
  providers: [RoundService],
})
export class RoundModule {}

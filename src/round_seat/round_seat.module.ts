import { Module } from "@nestjs/common";
import { RoundSeatService } from "./round_seat.service";
import { RoundSeatController } from "./round_seat.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoundSeat } from "./entities/round_seat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoundSeat])],
  controllers: [RoundSeatController],
  providers: [RoundSeatService],
  exports: [RoundSeatService, TypeOrmModule],
})
export class RoundSeatModule {}

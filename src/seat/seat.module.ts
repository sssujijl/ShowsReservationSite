import { Module } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { SeatController } from "./seat.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seat } from "./entities/seat.entity";
import { HallModule } from "src/hall/hall.module";

@Module({
  imports: [TypeOrmModule.forFeature([Seat]), HallModule],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}

import { Module } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { RoundSeatModule } from "src/round_seat/round_seat.module";
import { PointModule } from "src/point/point.module";

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), RoundSeatModule, PointModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}

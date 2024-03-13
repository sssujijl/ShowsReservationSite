import { PickType } from "@nestjs/mapped-types";
import { RoundSeat } from "../entities/round_seat.entity";

export class CreateRoundSeatDto extends PickType(RoundSeat, [
  "roundId",
  "seatId",
  "price",
]) {}

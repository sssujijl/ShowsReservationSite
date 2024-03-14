import { PickType } from "@nestjs/mapped-types";
import { RoundSeat } from "../entities/round_seat.entity";

export class UpdateRoundSeatDto extends PickType(RoundSeat, ["id", "status"]) {}

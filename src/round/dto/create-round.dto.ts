import { PickType } from "@nestjs/mapped-types";
import { Round } from "../entities/round.entity";
import { IsObject, ValidateNested } from "class-validator";
import { SeatClass } from "src/seat/types/seatClass.type";

export class CreateRoundDto extends PickType(Round, [
  "content",
  "datetime",
  "showId",
]) {
  @IsObject()
  @ValidateNested()
  seatPrices: Record<SeatClass, number>;
}

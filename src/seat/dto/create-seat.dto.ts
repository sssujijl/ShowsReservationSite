import { PickType } from "@nestjs/mapped-types";
import { Seat } from "../entities/seat.entity";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSeatDto extends PickType(Seat, ["hallId", "seatClass"]) {
  @IsNumber()
  @IsNotEmpty({ message: "추가하고 싶은 좌석 갯수를 입력해주세요." })
  readonly extraSeatsCount: number;
}

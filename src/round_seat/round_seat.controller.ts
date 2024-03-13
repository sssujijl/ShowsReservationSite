import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { RoundSeatService } from "./round_seat.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("roundSeat")
export class RoundSeatController {
  constructor(private readonly roundSeatService: RoundSeatService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get(":roundId")
  async findAllRoundSeat(@Param("roundId") roundId: number) {
    return await this.roundSeatService.findAllRoundSeat(+roundId);
  }
}

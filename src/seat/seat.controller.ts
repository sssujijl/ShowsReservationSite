import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { SeatService } from "./seat.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { validate } from "class-validator";
import { HallService } from "src/hall/hall.service";

@Controller("seat")
export class SeatController {
  constructor(
    private readonly seatService: SeatService,
    private readonly hallService: HallService,
  ) {}

  @UseGuards(AuthGuard("admin"))
  @Post(":hallId")
  async createSeats(
    @Body() createSeatDto: CreateSeatDto,
    @Param("hallId") hallId: number,
  ) {
    validate(createSeatDto);

    await this.hallService.findHallById(+hallId);

    createSeatDto.hallId = +hallId;
    return await this.seatService.createSeats(createSeatDto);
  }
}

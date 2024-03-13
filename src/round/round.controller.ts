import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { RoundService } from "./round.service";
import { CreateRoundDto } from "./dto/create-round.dto";
import { AuthGuard } from "@nestjs/passport";
import { validate } from "class-validator";

@Controller("round")
export class RoundController {
  constructor(private readonly roundService: RoundService) {}

  @UseGuards(AuthGuard("admin"))
  @Post(":showId")
  async createRound(
    @Body() createRoundDto: CreateRoundDto,
    @Param("showId") showId: number,
  ) {
    validate(createRoundDto);

    return await this.roundService.createRound(createRoundDto, +showId);
  }

  @Get(":showId")
  async findAllRound(@Param("showId") showId: number) {
    return await this.roundService.findAllRound(+showId);
  }
}

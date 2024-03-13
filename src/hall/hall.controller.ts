import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { HallService } from "./hall.service";
import { CreateHallDto } from "./dto/create-hall.dto";
import { AuthGuard } from "@nestjs/passport";
import { validate } from "class-validator";

@Controller("hall")
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @UseGuards(AuthGuard("admin"))
  @Post()
  createHall(@Body() createHallDto: CreateHallDto) {
    validate(createHallDto);

    return this.hallService.createHall(createHallDto);
  }

  @Get(":id")
  findHallById(@Param("id") id: number) {
    return this.hallService.findHallById(+id);
  }
}

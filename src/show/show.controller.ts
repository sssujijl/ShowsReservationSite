import { Controller, Post, Body, UseGuards, Get, Param } from "@nestjs/common";
import { ShowService } from "./show.service";
import { CreateShowDto } from "./dto/create-show.dto";
import { AuthGuard } from "@nestjs/passport";
import { validate } from "class-validator";

@Controller("show")
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @UseGuards(AuthGuard("admin"))
  @Post()
  async createShow(@Body() createShowDto: CreateShowDto) {
    validate(createShowDto);
    return await this.showService.createShow(createShowDto);
  }

  @Get()
  async findAllShows() {
    return await this.showService.findAllShows();
  }

  @Get(":id")
  async findShowById(@Param("id") id: number) {
    return await this.showService.findShowById(+id);
  }
}

import { Controller, Post, Param, UseGuards, Body, Get } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/user/entities/user.entity";
import { UserInfo } from "src/utils/userInfo.decorator";
import { validate } from "class-validator";

@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post(":roundSeatId")
  async createTicket(
    @Param("roundSeatId") roundSeatId: number,
    @UserInfo() user: User,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    validate(createTicketDto);

    createTicketDto.userId = user.id;

    return await this.ticketService.createTicket(+roundSeatId, createTicketDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async findAllTicket(@UserInfo() user: User) {
    return await this.ticketService.findAllTicket(user.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":ticketId")
  async findTicket(
    @UserInfo() user: User,
    @Param("ticketId") ticketId: number,
  ) {
    return await this.ticketService.findInfo(user.id, +ticketId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/cancel/:ticketId")
  async cancelTicket(
    @UserInfo() user: User,
    @Param("ticketId") ticketId: number,
  ) {
    return await this.ticketService.cancelTicket(user.id, +ticketId);
  }
}

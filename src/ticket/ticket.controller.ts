import { Controller, Post, Param, UseGuards, Body } from "@nestjs/common";
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
}

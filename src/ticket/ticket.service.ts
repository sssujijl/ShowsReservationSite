import { Injectable, NotFoundException } from "@nestjs/common";
import { RoundSeatService } from "src/round_seat/round_seat.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { DataSource, Repository } from "typeorm";
import { PointService } from "src/point/point.service";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly roundSeatService: RoundSeatService,
    private readonly pointService: PointService,
    private dataSource: DataSource,
  ) {}

  async createTicket(roundSeatId: number, createTicketDto: CreateTicketDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const roundSeat =
        await this.roundSeatService.findRoundSeatById(roundSeatId);

      if (roundSeat.status === false) {
        throw new Error("이미 판매된 좌석입니다.");
      }

      createTicketDto.roundSeatId = roundSeatId;

      const ticket = await queryRunner.manager.save(Ticket, createTicketDto);

      console.log("============");
      const test = await this.roundSeatService.updateRoundSeat(
        ticket.roundSeatId,
        false,
      );
      console.log("test----------", test);
      console.log("..............");
      await this.pointService.updatePoint(
        createTicketDto.userId,
        roundSeat.price,
      );

      await queryRunner.commitTransaction();
      return { message: "해당 공연을 예매하였습니다." };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: `${error}` };
    } finally {
      await queryRunner.release();
    }
  }

  async findAllTicket(userId: number) {
    try {
      const tickets = await this.ticketRepository.findBy({ userId });

      if (!tickets) {
        throw new NotFoundException(
          "해당 사용자가 예약한 티켓 목록을 찾을 수 없습니다.",
        );
      }

      return tickets;
    } catch (error) {
      return { message: `${error}` };
    }
  }
}

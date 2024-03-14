import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { DataSource, Repository } from "typeorm";
import { PointService } from "src/point/point.service";
import { RoundSeat } from "src/round_seat/entities/round_seat.entity";
import { RoundSeatService } from "src/round_seat/round_seat.service";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(RoundSeat)
    private readonly roundSeatRepository: Repository<RoundSeat>,
    private readonly pointService: PointService,
    private readonly roundSeatService: RoundSeatService,
    private dataSource: DataSource,
  ) {}

  async createTicket(roundSeatId: number, createTicketDto: CreateTicketDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const roundSeat = await queryRunner.manager.findOneBy(RoundSeat, {
        id: roundSeatId,
      });
      if (roundSeat.status === false) {
        throw new Error("이미 판매된 좌석입니다.");
      } else {
        (roundSeat.status = false), (createTicketDto.roundSeatId = roundSeatId);
      }

      await queryRunner.manager.save(Ticket, createTicketDto);

      await queryRunner.manager.save(RoundSeat, roundSeat);

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

  async findTicket(userId: number, ticketId: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ["roundSeat"],
    });

    if (ticket.userId !== userId) {
      throw new Error("해당 티켓을 조회할 권한이 없습니다.");
    } else if (!ticket) {
      throw new NotFoundException("해당 티켓을 조회할 수 없습니다.");
    }

    return ticket;
  }

  async findInfo(userId: number, ticketId: number) {
    try {
      const ticket = await this.findTicket(userId, ticketId);

      const Info = await this.roundSeatService.findInfo(ticket.roundSeatId);

      return {
        title: Info.round.show.title,
        dateTime: Info.round.datetime,
        hall: Info.seat.hall.name,
        address: Info.seat.hall.address,
        seat: {
          seatClass: Info.seat.seatClass,
          seatNumber: Info.seat.seatNumber,
        },
      };
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async cancelTicket(userId: number, ticketId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const ticket = await this.findTicket(userId, ticketId);
      if (ticket) {
        ticket.status = false;
      }

      await queryRunner.manager.save(Ticket, ticket);

      await this.pointService.cancelTicket(userId, ticket.roundSeat.price);

      return { message: "해당 티켓 예매가 취소되었습니다." };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: `${error}` };
    } finally {
      await queryRunner.release();
    }
  }
}

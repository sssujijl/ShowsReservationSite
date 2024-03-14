import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoundSeat } from "./entities/round_seat.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoundSeatService {
  constructor(
    @InjectRepository(RoundSeat)
    private readonly roundSeatRepository: Repository<RoundSeat>,
  ) {}

  async findAllRoundSeat(roundId: number) {
    try {
      const roundSeats = await this.roundSeatRepository.find({
        where: { roundId },
        relations: ["seat", "round"],
      });

      return roundSeats.map((roundSeat) => ({
        round: roundSeat.round.content,
        dateTime: roundSeat.round.datetime,
        seatClass: roundSeat.seat.seatClass,
        seatNumber: roundSeat.seat.seatNumber,
        price: roundSeat.price,
        status: roundSeat.status,
      }));
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async findRoundSeatById(id: number) {
    const roundSeat = await this.roundSeatRepository.findOneBy({ id });

    if (!roundSeat) {
      throw new NotFoundException("해당 회차의 선택 좌석이 없습니다.");
    }

    return roundSeat;
  }

  async findInfo(id: number) {
    const roundSeat = await this.roundSeatRepository.findOne({
      where: { id },
      relations: ["round", "seat", "seat.hall", "round.show"],
    });

    return roundSeat;
  }
}

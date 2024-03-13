import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoundDto } from "./dto/create-round.dto";
import { Round } from "./entities/round.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Hall } from "src/hall/entities/hall.entity";
import { Show } from "src/show/entities/show.entity";
import { SeatClass } from "src/seat/types/seatClass.type";
import { CreateRoundSeatDto } from "src/round_seat/dto/create-round_seat.dto";
import { RoundSeat } from "src/round_seat/entities/round_seat.entity";

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
    private dataSource: DataSource,
    @InjectRepository(Hall)
    private readonly hallRepository: Repository<Hall>,
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async createRound(createRoundDto: CreateRoundDto, showId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const seats = await this.findSeatsId(showId);

      createRoundDto.showId = showId;
      const round = await queryRunner.manager.save(Round, createRoundDto);

      const newRoundSeats = await this.createRoundSeat(
        seats,
        round.id,
        createRoundDto.seatPrices,
      );
      await queryRunner.manager.save(RoundSeat, newRoundSeats);

      await queryRunner.commitTransaction();

      return round;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: `${error}` };
    } finally {
      await queryRunner.release();
    }
  }

  async findSeatsId(showId: number) {
    const show = await this.showRepository.findOneBy({ id: showId });
    if (!show) {
      throw new NotFoundException("해당 공연을 찾을 수 없습니다.");
    }

    const hall = await this.hallRepository.findOne({
      where: { id: show.hallId },
      relations: ["seats"],
    });

    return hall.seats.map((seat) => ({
      id: seat.id,
      seatClass: seat.seatClass,
    }));
  }

  async createRoundSeat(
    seats: { id: number; seatClass: SeatClass }[],
    id: number,
    seatPrices: Record<SeatClass, number>,
  ) {
    const newRoundSeats = seats.map((seat) => {
      const newRoundSeat = new CreateRoundSeatDto();
      newRoundSeat.roundId = id;
      newRoundSeat.seatId = seat.id;
      newRoundSeat.price = seatPrices[seat.seatClass];
      return newRoundSeat;
    });
    return newRoundSeats;
  }

  async findAllRound(showId: number) {
    try {
      const rounds = await this.roundRepository.findBy({ showId });

      if (!rounds) {
        throw new NotFoundException("해당 공연의 회차를 찾을 수 없습니다.");
      }

      return rounds;
    } catch (error) {
      return { message: `${error}` };
    }
  }
}

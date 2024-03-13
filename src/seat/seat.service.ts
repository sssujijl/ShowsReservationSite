import { Injectable } from "@nestjs/common";
import { Seat } from "./entities/seat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateSeatDto } from "./dto/create-seat.dto";

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat) private readonly seatRepository: Repository<Seat>,
    private dataSource: DataSource,
  ) {}

  async createSeats(createSeatDto: CreateSeatDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const LastSeatNumber = await this.findLastSeatNumber(createSeatDto);

      const newSeats = Array.from(
        { length: createSeatDto.extraSeatsCount },
        (_, index) => {
          const newSeat = new Seat();
          newSeat.hallId = createSeatDto.hallId;
          newSeat.seatClass = createSeatDto.seatClass;
          newSeat.seatNumber = LastSeatNumber + index;
          return newSeat;
        },
      );

      await queryRunner.manager.save(Seat, newSeats);

      await queryRunner.commitTransaction();

      return {
        message: `${createSeatDto.seatClass} 등급의 좌석이 ${createSeatDto.extraSeatsCount} 개 생성되었습니다.`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: `${error}` };
    } finally {
      await queryRunner.release();
    }
  }

  async findLastSeatNumber(createSeatDto: CreateSeatDto): Promise<number> {
    const LastSeatNumber = await this.seatRepository.findOne({
      where: {
        hallId: createSeatDto.hallId,
        seatClass: createSeatDto.seatClass,
      },
      order: {
        seatNumber: "desc",
      },
    });

    if (!LastSeatNumber) {
      return 1;
    } else {
      return LastSeatNumber.seatNumber;
    }
  }
}

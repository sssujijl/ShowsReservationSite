import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateHallDto } from "./dto/create-hall.dto";
import { Hall } from "./entities/hall.entity";
import { Seat } from "src/seat/entities/seat.entity";

@Injectable()
export class HallService {
  constructor(
    @InjectRepository(Hall) private hallRepository: Repository<Hall>,
  ) {}

  async createHall(createHallDto: CreateHallDto) {
    try {
      return await this.hallRepository.save(createHallDto);
    } catch (error) {
      if (error.message.includes("Duplicate entry")) {
        throw new ConflictException("이미 사용 중인 공연장 이름입니다.");
      } else {
        return { message: `${error}` };
      }
    }
  }

  async findHallById(id: number) {
    try {
      const hall = await this.hallRepository.findOne({
        where: { id },
        relations: ["seats"],
      });

      if (!hall) {
        throw new NotFoundException("해당 공연장이 없습니다.");
      }

      const findSeatByseatClass = this.findSeatByseatClass(hall.seats);

      return {
        name: hall.name,
        address: hall.address,
        seats: findSeatByseatClass,
      };
    } catch (error) {
      return { message: `${error}` };
    }
  }

  findSeatByseatClass(seats: Seat[]) {
    return seats.reduce(
      (acc, seat) => {
        acc[seat.seatClass]++;
        return acc;
      },
      { VIP: 0, S: 0, R: 0, A: 0, B: 0 },
    );
  }

  async findHallandSeat(id: number) {
    try {
      const hall = await this.hallRepository.findOne({
        where: { id },
        relations: ["seats"],
      });

      if (!hall) {
        throw new NotFoundException("해당 공연장이 없습니다.");
      }

      return hall;
    } catch (error) {
      return { message: `${error}` };
    }
  }
}

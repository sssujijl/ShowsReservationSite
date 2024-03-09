import { Injectable } from '@nestjs/common';
import { CreateRoundSeatDto } from './dto/create-round_seat.dto';
import { UpdateRoundSeatDto } from './dto/update-round_seat.dto';

@Injectable()
export class RoundSeatService {
  create(createRoundSeatDto: CreateRoundSeatDto) {
    return 'This action adds a new roundSeat';
  }

  findAll() {
    return `This action returns all roundSeat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roundSeat`;
  }

  update(id: number, updateRoundSeatDto: UpdateRoundSeatDto) {
    return `This action updates a #${id} roundSeat`;
  }

  remove(id: number) {
    return `This action removes a #${id} roundSeat`;
  }
}

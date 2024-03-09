import { Module } from '@nestjs/common';
import { RoundSeatService } from './round_seat.service';
import { RoundSeatController } from './round_seat.controller';

@Module({
  controllers: [RoundSeatController],
  providers: [RoundSeatService],
})
export class RoundSeatModule {}

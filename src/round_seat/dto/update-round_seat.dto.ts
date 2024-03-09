import { PartialType } from '@nestjs/mapped-types';
import { CreateRoundSeatDto } from './create-round_seat.dto';

export class UpdateRoundSeatDto extends PartialType(CreateRoundSeatDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoundSeatService } from './round_seat.service';
import { CreateRoundSeatDto } from './dto/create-round_seat.dto';
import { UpdateRoundSeatDto } from './dto/update-round_seat.dto';

@Controller('round-seat')
export class RoundSeatController {
  constructor(private readonly roundSeatService: RoundSeatService) {}

  @Post()
  create(@Body() createRoundSeatDto: CreateRoundSeatDto) {
    return this.roundSeatService.create(createRoundSeatDto);
  }

  @Get()
  findAll() {
    return this.roundSeatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roundSeatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoundSeatDto: UpdateRoundSeatDto) {
    return this.roundSeatService.update(+id, updateRoundSeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roundSeatService.remove(+id);
  }
}

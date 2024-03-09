import { Test, TestingModule } from '@nestjs/testing';
import { RoundSeatService } from './round_seat.service';

describe('RoundSeatService', () => {
  let service: RoundSeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundSeatService],
    }).compile();

    service = module.get<RoundSeatService>(RoundSeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

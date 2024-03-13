import { Test, TestingModule } from "@nestjs/testing";
import { RoundSeatController } from "./round_seat.controller";
import { RoundSeatService } from "./round_seat.service";

describe("RoundSeatController", () => {
  let controller: RoundSeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundSeatController],
      providers: [RoundSeatService],
    }).compile();

    controller = module.get<RoundSeatController>(RoundSeatController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

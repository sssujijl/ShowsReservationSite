import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Point } from "./entites/point.entity";
import { Repository } from "typeorm";

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
  ) {}

  async updatePoint(userId: number, seatPrice: number) {
    try {
      const point = await this.pointRepository.findOneBy({ userId });
      if (!point) {
        throw new NotFoundException("사용자의 포인트를 찾을 수 없습니다.");
      }

      const newPoint = point.point - seatPrice;
      if (newPoint < 0) {
        throw new Error("현재 보유하고 있는 포인트 잔액이 부족합니다.");
      }

      await this.pointRepository.update({ userId }, { point: newPoint });
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async cancelTicket(userId: number, seatPrice: number) {
    try {
      const point = await this.pointRepository.findOneBy({ userId });
      if (!point) {
        throw new NotFoundException("사용자의 포인트를 찾을 수 없습니다.");
      }

      const newPoint = point.point + seatPrice;

      await this.pointRepository.update({ userId }, { point: newPoint });
    } catch (error) {
      return { message: `${error}` };
    }
  }
}

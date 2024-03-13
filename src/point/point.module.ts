// point.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Point } from "./entites/point.entity";
import { PointService } from "./point.service";

@Module({
  imports: [TypeOrmModule.forFeature([Point])],
  providers: [PointService],
  exports: [TypeOrmModule, PointService],
})
export class PointModule {}

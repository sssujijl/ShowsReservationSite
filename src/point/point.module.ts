// point.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entites/point.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Point]),
  ],
  exports: [TypeOrmModule],
})
export class PointModule {}

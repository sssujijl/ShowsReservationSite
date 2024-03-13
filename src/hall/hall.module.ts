import { Module } from "@nestjs/common";
import { HallService } from "./hall.service";
import { HallController } from "./hall.controller";
import { Hall } from "./entities/hall.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Hall])],
  controllers: [HallController],
  providers: [HallService],
  exports: [HallService, TypeOrmModule],
})
export class HallModule {}

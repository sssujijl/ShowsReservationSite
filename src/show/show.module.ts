import { Module } from "@nestjs/common";
import { ShowService } from "./show.service";
import { ShowController } from "./show.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Show } from "./entities/show.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [ShowService, TypeOrmModule],
})
export class ShowModule {}

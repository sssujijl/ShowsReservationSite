import Joi from "joi";

import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./user/entities/user.entity";
import { UserModule } from "./user/user.module";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { HallModule } from "./hall/hall.module";
import { ShowModule } from "./show/show.module";
import { TicketModule } from "./ticket/ticket.module";
import { PointModule } from "./point/point.module";
import { Point } from "./point/entites/point.entity";
import { Hall } from "./hall/entities/hall.entity";
import { Round } from "./round/entities/round.entity";
import { RoundSeat } from "./round_seat/entities/round_seat.entity";
import { Seat } from "./seat/entities/seat.entity";
import { Show } from "./show/entities/show.entity";
import { Ticket } from "./ticket/entities/ticket.entity";
import { RoundModule } from "./round/round.module";
import { RoundSeatModule } from "./round_seat/round_seat.module";
import { SeatModule } from "./seat/seat.module";

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: "mysql",
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    username: configService.get("DB_USERNAME"),
    password: configService.get("DB_PASSWORD"),
    database: configService.get("DB_NAME"),
    entities: [User, Point, Hall, Round, RoundSeat, Seat, Show, Ticket],
    synchronize: configService.get("DB_SYNC"),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    HallModule,
    ShowModule,
    TicketModule,
    PointModule,
    RoundModule,
    RoundSeatModule,
    SeatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

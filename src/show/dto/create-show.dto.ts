import { PickType } from "@nestjs/mapped-types";
import { Show } from "../entities/show.entity";

export class CreateShowDto extends PickType(Show, [
  "title",
  "content",
  "category",
  "startDate",
  "endDate",
  "ticketingDate",
  "hallId",
]) {}

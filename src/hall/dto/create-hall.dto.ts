import { PickType } from "@nestjs/mapped-types";
import { Hall } from "../entities/hall.entity";

export class CreateHallDto extends PickType(Hall, ["name", "address"]) {}

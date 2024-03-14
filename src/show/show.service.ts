import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShowDto } from "./dto/create-show.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Show } from "./entities/show.entity";
import { Repository } from "typeorm";
import { SearchShowDto } from "./dto/search-show.dto";

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show) private readonly showRepository: Repository<Show>,
  ) {}

  async createShow(createShowDto: CreateShowDto) {
    try {
      const show = await this.showRepository.save(createShowDto);

      return { message: `${show.title} 공연을 등록하였습니다.`, show };
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async findAllShows() {
    try {
      const shows = await this.showRepository.find({
        select: ["title", "startDate", "endDate"],
        relations: ["hall"],
      });

      return shows;
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async findShowById(id: number) {
    try {
      const show = await this.showRepository.findOne({
        where: { id },
        relations: ["hall", "rounds"],
      });

      if (!show) {
        throw new NotFoundException("해당 공연을 찾을 수 없습니다.");
      }

      return show;
    } catch (error) {
      return { message: `${error}` };
    }
  }

  async searchShows(searchShowDto: SearchShowDto) {
    try {
      const shows = await this.showRepository.find();

      if (searchShowDto.title) {
        return shows.filter((show) => show.title.includes(searchShowDto.title));
      } else if (searchShowDto.startDate) {
        return shows.filter(
          (show) => show.startDate === searchShowDto.startDate,
        );
      } else if (searchShowDto.endDate) {
        return shows.filter((show) => show.endDate === searchShowDto.endDate);
      } else if (searchShowDto.category) {
        return shows.filter((show) => show.category === searchShowDto.category);
      } else {
        throw new NotFoundException("해당하는 공연 목록을 찾을 수 없습니다.");
      }
    } catch (error) {
      return { message: `${error}` };
    }
  }
}

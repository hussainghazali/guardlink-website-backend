import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Accident } from "./entities/accident.entity";
import { RegisterAccidentDto } from "./dto/register-accident.dto";

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private accidentsRepository: Repository<Accident>,
  ) {}

  async create(
    registerAccidentDto: RegisterAccidentDto,
  ) {
    const { date, location, details } = registerAccidentDto;
    const formattedDate = this.convertDateFormat(date);

    // Convert userId to string if necessary
    const accident = this.accidentsRepository.create({
      date: formattedDate,
      location,
      details,
    });

    return this.accidentsRepository.save(accident);
  }

  private convertDateFormat(fromTime: string): string | undefined {
    try {
      const date = new Date(fromTime);
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      });
      return formattedDate;
    } catch (error) {
      return undefined;
    }
  }
}

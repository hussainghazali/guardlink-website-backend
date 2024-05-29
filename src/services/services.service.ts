import { Injectable } from "@nestjs/common";
import { Repository, ServerDescription } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterServicesDto } from "./dto/services-register.dto";
import { Service } from "./entities/service.entity";
import { title } from "process";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(
    registerServiceDto: RegisterServicesDto,
  ) {
    const { } = registerServiceDto;
    
    return this.serviceRepository.save(registerServiceDto);
  }

  async getAllServices() {
    const allUsers = await this.serviceRepository.find();

    if (!allUsers || allUsers.length === 0) {
      return {
        message: "No users retrieved",
        data: [],
      };
    }

    const formattedUsers = allUsers.map((service) => {
      return {
        title : service.title,
        description : service.description
      };
    });

    return {
      message: "All Services retrieved successfully",
      data: formattedUsers,
    };
  }
}

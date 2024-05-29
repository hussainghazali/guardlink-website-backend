import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entities/contact.entity";
import { RegisterContactDto } from "./dto/contact-register.dto";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(
    registerContactDto: RegisterContactDto,
  ) {
    const { } = registerContactDto;
    
    return this.contactRepository.save(registerContactDto);
  }

  async getAllServices() {
    const allUsers = await this.contactRepository.find();

    if (!allUsers || allUsers.length === 0) {
      return {
        message: "No users retrieved",
        data: [],
      };
    }

    const formattedUsers = allUsers.map((contact) => {
      return {
        id : contact.id,
        name : contact.name,
        city : contact.city,
        phoneNumber  : contact.phoneNumber,
        services : contact.services,
        notes : contact.notes
      };
    });

    return {
      message: "All Services retrieved successfully",
      data: formattedUsers,
    };
  }
}

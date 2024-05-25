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
}

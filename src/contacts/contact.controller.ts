import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RegisterContactDto } from "./dto/contact-register.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoggerService } from "src/logger/logger.service";
import getDictionary from "lang/getDictionary";

@ApiTags("contact")
// @ApiBearerAuth()
@Controller("contacts")
export class ContactController {
  constructor(
    private readonly accidentsService: ContactService,
    private readonly logger: LoggerService,
    ) {}

  @Post("create")
  @Post('register')
  async registerAccident(
    @Body() registerContactDto: RegisterContactDto,
  ) {
    const logMessage = 'Accident Created';
    const errorMessage = 'An error occurred while processing your request';
    try {
      this.logger.log(logMessage);
      const result = await this.accidentsService.create(registerContactDto);
      return { success: true, data: result, statusCode: HttpStatus.CREATED };
    } catch (error) {  
      this.logger.error(errorMessage, error.stack);
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      });
    }
  }  

  @Get()
  async getAllContacts() {
    try {
      const allUsers = await this.accidentsService.getAllServices();
      if (!allUsers) {
        return { message: "No Service found", statusCode: HttpStatus.NOT_FOUND };
      }
      this.logger.log('Service Fetched', 'ServiceController');
      return { ...allUsers, statusCode: HttpStatus.OK };
    } catch (error) {
      this.logger.error('Failed to fetch service', error.stack, 'ServiceController');
      throw { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to fetch service' };
    }
  }
}

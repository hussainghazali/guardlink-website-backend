import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpStatus,
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
}

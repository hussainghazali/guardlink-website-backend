import {
  Controller,
  Post,
  Body,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { AccidentsService } from "./accidents.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RegisterAccidentDto } from "./dto/register-accident.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoggerService } from "src/logger/logger.service";
import getDictionary from "lang/getDictionary";

@ApiTags("accidents")
@ApiBearerAuth()
@Controller("accidents")
export class AccidentController {
  constructor(
    private readonly accidentsService: AccidentsService,
    private readonly logger: LoggerService,
    ) {}

  @Post("create")
  @Post('register')
  async registerAccident(
    @Body() registerAccidentDto: RegisterAccidentDto,
  ) {
    const logMessage = 'Accident Created';
    const errorMessage = 'An error occurred while processing your request';
    try {
      this.logger.log(logMessage);
      const result = await this.accidentsService.create(registerAccidentDto);
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

import {
    Controller,
    Post,
    Body,
    BadRequestException,
    HttpStatus,
    Get,
  } from "@nestjs/common";
  import { ApiTags } from "@nestjs/swagger";
  import { LoggerService } from "src/logger/logger.service";
import { RegisterServicesDto } from "./dto/services-register.dto";
import { ServicesService } from "./services.service";
  
  @ApiTags("services")
  // @ApiBearerAuth()
  @Controller("service")
  export class ServiceController {
    constructor(
      private readonly servicesService: ServicesService,
      private readonly logger: LoggerService,
      ) {}
  
    @Post("create")
    @Post('register')
    async registerService(
      @Body() registerServiceDto: RegisterServicesDto,
    ) {
      const logMessage = 'Service Created';
      const errorMessage = 'An error occurred while processing your request';
      try {
        this.logger.log(logMessage);
        const result = await this.servicesService.create(registerServiceDto);
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
    async getAllServices() {
      try {
        const allUsers = await this.servicesService.getAllServices();
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
  
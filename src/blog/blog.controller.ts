import {
    Controller,
    Post,
    Body,
    BadRequestException,
    HttpStatus,
    Get,
    UseInterceptors,
    UploadedFile,
  } from "@nestjs/common";
  import { ApiTags } from "@nestjs/swagger";
  import { LoggerService } from "src/logger/logger.service";
import { BlogService } from "./blog.service";
import { RegisterBlogDto } from "./dto/services-register.dto";
import { FileInterceptor } from "@nestjs/platform-express";
  @ApiTags("blog")
  // @ApiBearerAuth()
  @Controller("blog")
  export class BlogController {
    constructor(
      private readonly blogService: BlogService,
      private readonly logger: LoggerService,
      ) {}
  
    @Post("create")
    @UseInterceptors(FileInterceptor("file"))
    @Post('register')
    async registerService(
      @UploadedFile() file: Express.Multer.File,
      @Body() registerServiceDto: RegisterBlogDto,
    ) {
      const logMessage = 'Service Created';
      const errorMessage = 'An error occurred while processing your request';
      try {
        this.logger.log(logMessage);
        const result = await this.blogService.create(registerServiceDto, file);
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
        const allUsers = await this.blogService.getAllServices();
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
  
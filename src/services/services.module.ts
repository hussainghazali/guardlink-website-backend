import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServicesService } from './services.service';
import { LoggerModule } from 'src/logger/logger.module';
import { ServiceController } from './services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), LoggerModule],
  controllers: [ServiceController],
  providers: [ServicesService],
})
export class ServiceModule {}

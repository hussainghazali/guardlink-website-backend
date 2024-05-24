import { Module } from '@nestjs/common';
import { AccidentsService } from './accidents.service';
import { AccidentController } from './accidents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accident } from './entities/accident.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Accident]), LoggerModule],
  controllers: [AccidentController],
  providers: [AccidentsService],
})
export class AccidentsModule {}

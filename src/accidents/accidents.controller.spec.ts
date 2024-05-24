import { Test, TestingModule } from '@nestjs/testing';
import { AccidentController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { RegisterAccidentDto } from './dto/register-accident.dto';
import { LoggerService } from 'src/logger/logger.service';

describe('AccidentController', () => {
  let controller: AccidentController;
  let accidentsService: AccidentsService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccidentController],
      providers: [
        {
          provide: AccidentsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccidentController>(AccidentController);
    accidentsService = module.get<AccidentsService>(AccidentsService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerAccident', () => {
    it('should call create method of accidentsService and log the action', () => {
      const file = {} as Express.Multer.File;
      const registerAccidentDto: RegisterAccidentDto = {
        date: '2022-12-31T14:30:00.000Z',
        location: 'Sample Location',
        details: 'Sample Details',
      };
      
      const user = { sub: 'f560fb7f-0942-4ec3-b292-1a4b0bdf0958' };

      controller.registerAccident(file, registerAccidentDto, { user });

      expect(accidentsService.create).toHaveBeenCalledWith(registerAccidentDto, user.sub, file);
      expect(loggerService.log).toHaveBeenCalledWith('Accident Created', 'AccidentController');
    });
  });
});

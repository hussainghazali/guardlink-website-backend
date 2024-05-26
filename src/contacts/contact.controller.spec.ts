import { Test, TestingModule } from '@nestjs/testing';
import { RegisterContactDto } from './dto/contact-register.dto';
import { LoggerService } from 'src/logger/logger.service';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

describe('AccidentController', () => {
  let controller: ContactController;
  let contactService: ContactService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
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

    controller = module.get<ContactController>(ContactController);
    contactService = module.get<ContactService>(ContactService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerAccident', () => {
    it('should call create method of accidentsService and log the action', () => {
      const file = {} as Express.Multer.File;
      const registerAccidentDto: RegisterContactDto = {
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        services: '',
        notes: ''
      };
      
      const user = { sub: 'f560fb7f-0942-4ec3-b292-1a4b0bdf0958' };

      controller.registerAccident(registerAccidentDto);

      expect(contactService.create).toHaveBeenCalledWith(registerAccidentDto, user.sub, file);
      expect(loggerService.log).toHaveBeenCalledWith('Contact Created', 'RegisterContactDto');
    });
  });
});

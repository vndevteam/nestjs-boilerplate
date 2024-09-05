import { MailService } from '@/mail/mail.service';
import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailQueueService } from './email-queue.service';

describe('EmailQueueService', () => {
  let service: EmailQueueService;
  let mailServiceValue: Partial<Record<keyof MailService, jest.Mock>>;

  beforeAll(async () => {
    mailServiceValue = {
      sendEmailVerification: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailQueueService,
        {
          provide: MailService,
          useValue: mailServiceValue,
        },
        {
          provide: getQueueToken('email'),
          useValue: {
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailQueueService>(EmailQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

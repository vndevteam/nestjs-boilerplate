import { MailService } from '@/mail/mail.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailQueueService {
  private readonly logger = new Logger(EmailQueueService.name);

  constructor(private readonly mailService: MailService) {}

  async sendEmailVerification(data: any): Promise<void> {
    this.logger.debug(`Sending email verification to ${data.email}`);
    await this.mailService.sendEmailVerification(data.email, 'test'); // TODO: Update logic when sending email verification

    return null;
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailVerification(email: string, token: string) {
    const url = `example.com/auth/verify-email?token=${token}`;

    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Email Verification',
        template: 'email-verification',
        context: {
          email: email,
          url,
        },
      })
      .catch((err) => {
        this.logger.error('Error sending email verification');
        this.logger.error(err);
      });
  }
}

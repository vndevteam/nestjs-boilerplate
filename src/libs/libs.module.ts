import { Module } from '@nestjs/common';
import { AwsModule } from './aws/aws.module';
import { GcpModule } from './gcp/gcp.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [AwsModule, GcpModule, MailerModule],
})
export class LibsModule {}

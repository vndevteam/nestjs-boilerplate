import { Module } from '@nestjs/common';
import { EmailQueueModule } from './queues/email-queue/email-queue.module';
@Module({
  imports: [EmailQueueModule],
})
export class BackgroundModule {}

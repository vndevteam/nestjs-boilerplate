import { QueueName, QueuePrefix } from '@/constants/job.constant';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { EmailQueueEvents } from './email-queue.events';
import { EmailQueueService } from './email-queue.service';
import { EmailProcessor } from './email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.EMAIL,
      prefix: QueuePrefix.AUTH,
      streams: {
        events: {
          maxLen: 1000,
        },
      },
    }),
  ],
  providers: [EmailQueueService, EmailProcessor, EmailQueueEvents],
})
export class EmailQueueModule {}

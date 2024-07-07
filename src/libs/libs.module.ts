import { Module } from '@nestjs/common';
import { AwsModule } from './aws/aws.module';
import { GcpModule } from './gcp/gcp.module';

@Module({
  imports: [AwsModule, GcpModule],
})
export class LibsModule {}

import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, HealthModule],
})
export class ApiModule {}

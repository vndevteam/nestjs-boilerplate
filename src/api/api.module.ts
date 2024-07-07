import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, HealthModule, AuthModule, HomeModule],
})
export class ApiModule {}

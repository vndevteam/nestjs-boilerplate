import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule],
})
export class AppModule {}

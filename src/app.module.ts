import { Module } from '@nestjs/common';
import generateModulesSet from './utils/modules-set';

@Module({
  imports: generateModulesSet(),
})
export class AppModule {}

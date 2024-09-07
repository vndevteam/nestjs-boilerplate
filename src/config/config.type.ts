import { AuthConfig } from '@/api/auth/config/auth-config.type';
import { DatabaseConfig } from '@/database/config/database-config.type';
import { MailConfig } from '@/mail/config/mail-config.type';
import { RedisConfig } from '@/redis/config/redis-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  auth: AuthConfig;
  mail: MailConfig;
};

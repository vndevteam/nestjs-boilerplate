import { AuthConfig } from '@/api/auth/config/auth-config.type';
import { DatabaseConfig } from '@/database/config/database-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
};

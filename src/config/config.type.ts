import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};

import { Environment } from '@/constants/app.constant';
import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import process from 'node:process';
import validateConfig from '../utils/validate-config';
import { AppConfig } from './app-config.type';

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsString()
  @IsOptional()
  API_NAME: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsBoolean()
  @IsOptional()
  APP_DEBUG: boolean;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string;

  @IsString()
  @IsOptional()
  APP_LOG_LEVEL: string;

  @IsBoolean()
  @IsOptional()
  APP_LOG_PRETTY: boolean;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || Environment.DEVELOPMENT,
    name: process.env.APP_NAME || 'app',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    debug: process.env.APP_DEBUG === 'true',
    apiPrefix: process.env.API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    logLevel: process.env.APP_LOG_LEVEL || 'warn',
    logPretty: process.env.APP_LOG_PRETTY === 'true',
  };
});

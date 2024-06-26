import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { type AllConfigType } from './config/config.type';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
  HttpStatus,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import setupSwagger from './utils/setup-swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const configService = app.get(ConfigService<AllConfigType>);
  const isDevelopment =
    configService.getOrThrow('app.nodeEnv', { infer: true }) === 'development';

  // Use global prefix if you don't have subdomain
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalFilters(new GlobalExceptionFilter(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );

  if (isDevelopment) {
    setupSwagger(app);
  }

  await app.listen(configService.getOrThrow('app.port', { infer: true }));

  console.info(`Server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();

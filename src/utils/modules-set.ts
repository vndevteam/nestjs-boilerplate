import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from '../api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from '../config/app.config';
import { TypeOrmConfigService } from '../database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../database/config/database.config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { AllConfigType } from '@/config/config.type';
import * as path from 'path';

function generateModulesSet() {
  const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
  ];
  let customModules: ModuleMetadata['imports'] = [];

  const dbModule = TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
    dataSourceFactory: async (options: DataSourceOptions) => {
      if (!options) {
        throw new Error('Invalid options passed');
      }

      return new DataSource(options).initialize();
    },
  });

  const i18nModule = I18nModule.forRootAsync({
    resolvers: [
      { use: QueryResolver, options: ['lang'] },
      AcceptLanguageResolver,
      new HeaderResolver(['x-lang']),
    ],
    useFactory: (configService: ConfigService<AllConfigType>) => {
      const isDevelopment =
        configService.get('app.nodeEnv', { infer: true }) === 'development';
      return {
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: {
          path: path.join(__dirname, '/../i18n/'),
          watch: isDevelopment,
        },
        logging: isDevelopment,
      };
    },
    inject: [ConfigService],
  });

  const modulesSet = process.env.MODULES_SET || 'monolith';

  switch (modulesSet) {
    case 'monolith':
      customModules = [ApiModule, dbModule, i18nModule];
      break;
    case 'api':
      customModules = [ApiModule, dbModule, i18nModule];
      break;
    default:
      console.error(`Unsupported modules set: ${modulesSet}`);
      break;
  }

  return imports.concat(customModules);
}

export default generateModulesSet;

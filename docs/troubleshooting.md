# Troubleshooting

This page contains common issues and solutions for the project.

---

[[toc]]

## Issues when running the application

### An instance of EnvironmentVariablesValidator has failed the validation

When running the application, you may encounter an error similar to the following:

  ```bash
  An instance of EnvironmentVariablesValidator has failed the validation:
  - property NODE_ENV has failed the following constraints: isEnum
  ,An instance of EnvironmentVariablesValidator has failed the validation:
  - property APP_LOG_SERVICE has failed the following constraints: isEnum

  [Nest] 19929  - 07/20/2024, 12:24:53 PM     LOG [NestFactory] Starting Nest application...
  [Nest] 19929  - 07/20/2024, 12:24:53 PM   ERROR [ExceptionHandler]
  Error in NODE_ENV:
  + isEnum: NODE_ENV must be one of the following values: local, development, staging, production, test

  Error in APP_LOG_SERVICE:
  + isEnum: APP_LOG_SERVICE must be one of the following values: console, google_logging, aws_cloudwatch
  ```

This error occurs when the environment variables are not set correctly. Ensure that the `.env` file is correctly set up with the required environment variables. You can copy the `.env.example` file and rename it to `.env` to set up the environment variables.

### Unable to connect to the database. Retrying

  ```bash
  ❯ pnpm start

  > nestjs-boilerplate@0.0.1 start /Users/lamngockhuong/develop/projects/vndevteam/nestjs-boilerplate
  > nest start

  ✔  TSC  Initializing type checker...
  >  TSC  Found 0 issues.
  >  SWC  Running...
  Successfully compiled: 108 files with swc (77.67ms)
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [NestFactory] Starting Nest application...
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] AppModule dependencies initialized +2ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] ApiModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] HttpModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] JwtModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] HomeModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] TerminusModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] PostModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] HealthModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] LoggerModule dependencies initialized +1ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
  AggregateError
      at __node_internal_ (node:internal/errors:174:15)
      at internalConnectMultiple (node:net:1114:18)
      at afterConnectMultiple (node:net:1667:5)
  [Nest] 73686  - 07/31/2024, 7:25:23 AM     LOG [InstanceLoader] I18nModule dependencies initialized +0ms
  [Nest] 73686  - 07/31/2024, 7:25:23 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
  AggregateError
      at __node_internal_ (node:internal/errors:174:15)
      at internalConnectMultiple (node:net:1114:18)
      at afterConnectMultiple (node:net:1667:5)
  ...
  ```

This error occurs when the application is unable to connect to the database. Ensure that the database is running and the connection details are correctly set up in the `.env` file.

---

Please refer to the [Configuration](./development.md#configuration) section for more information on setting up the environment variables.

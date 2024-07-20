# Troubleshooting

This page contains common issues and solutions for the project.

---

[[toc]]

## Error when running the application: `An instance of EnvironmentVariablesValidator has failed the validation`

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

Please refer to the [Configuration](./development.md#configuration) section for more information on setting up the environment variables.

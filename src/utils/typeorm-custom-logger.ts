/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import {
  QueryRunner,
  Logger as TypeOrmLogger,
  type LogLevel,
  type LogMessageType,
  type LoggerOptions,
} from 'typeorm';

class TypeOrmCustomLogger implements TypeOrmLogger {
  static getInstance(connectionName: string, options: LoggerOptions) {
    const logger = new Logger(`TypeORM[${connectionName}]`);
    return new TypeOrmCustomLogger(logger, options);
  }

  constructor(
    private readonly logger: Logger,
    private readonly options: LoggerOptions,
  ) {}

  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor('query')) {
      return;
    }

    const sql =
      query +
      (parameters && parameters.length
        ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
        : '');
    this.logger.log(`query: ${sql}`);
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    if (!this.isLogEnabledFor('query-error')) {
      return;
    }

    const sql =
      query +
      (parameters && parameters.length
        ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
        : '');
    this.logger.error(`query failed: ${sql}`);
    this.logger.error(`error:`, error);
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    if (!this.isLogEnabledFor('query-slow')) {
      return;
    }

    const sql =
      query +
      (parameters && parameters.length
        ? ' -- PARAMETERS: ' + this.stringifyParams(parameters)
        : '');
    this.logger.warn(`query is slow: ${sql}`);
    this.logger.warn(`execution time: ${time}`);
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor('schema-build')) {
      return;
    }

    this.logger.log(message);
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor('migration')) {
      return;
    }

    this.logger.log(message);
  }

  /**
   * Perform logging using given logger, or by default to the this.logger.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        if (!this.isLogEnabledFor('log')) {
          return;
        }

        this.logger.log(message);
        break;
      case 'info':
        if (!this.isLogEnabledFor('info')) {
          return;
        }

        this.logger.log(message);
        break;
      case 'warn':
        if (!this.isLogEnabledFor('warn')) {
          return;
        }

        this.logger.warn(message);
        break;
    }
  }

  /**
   * Check is logging for level or message type is enabled.
   */
  protected isLogEnabledFor(type?: LogLevel | LogMessageType) {
    switch (type) {
      case 'query':
        return (
          this.options === 'all' ||
          this.options === true ||
          (Array.isArray(this.options) && this.options.indexOf('query') !== -1)
        );

      case 'error':
      case 'query-error':
        return (
          this.options === 'all' ||
          this.options === true ||
          (Array.isArray(this.options) && this.options.indexOf('error') !== -1)
        );

      case 'query-slow':
        return true;

      case 'schema':
      case 'schema-build':
        return (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('schema') !== -1)
        );

      case 'migration':
        return true;

      case 'log':
        return (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('log') !== -1)
        );

      case 'info':
        return (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('info') !== -1)
        );

      case 'warn':
        return (
          this.options === 'all' ||
          (Array.isArray(this.options) && this.options.indexOf('warn') !== -1)
        );

      default:
        return false;
    }
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}

export default TypeOrmCustomLogger;

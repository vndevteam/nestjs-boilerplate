import { Logger } from '@nestjs/common';
import { LoggerLevel } from 'nodemailer/lib/shared';
import MailerCustomLogger from './mailer-custom-logger';

describe('MailerCustomLogger', () => {
  let logger: Logger;
  let mailerCustomLogger: MailerCustomLogger;

  beforeEach(() => {
    logger = new Logger('TestLogger');
    jest.spyOn(logger, 'log').mockImplementation(() => {});
    jest.spyOn(logger, 'debug').mockImplementation(() => {});
    jest.spyOn(logger, 'warn').mockImplementation(() => {});
    jest.spyOn(logger, 'error').mockImplementation(() => {});
    mailerCustomLogger = new MailerCustomLogger(logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize logger property correctly', () => {
    const mailerLogger = new MailerCustomLogger(logger);
    expect(mailerLogger['logger']).toBe(logger);
  });

  it('should initialize logLevels property with default values', () => {
    const mailerLogger = new MailerCustomLogger(logger);
    expect(mailerLogger['logLevels']).toEqual([
      'trace',
      'debug',
      'info',
      'warn',
      'error',
      'fatal',
    ]);
  });

  it('should initialize logLevels property with provided values', () => {
    const customLogLevels = ['info', 'error'] as LoggerLevel[];
    const mailerLogger = new MailerCustomLogger(logger, customLogLevels);
    expect(mailerLogger['logLevels']).toEqual(customLogLevels);
  });

  it('should create an instance using getInstance', () => {
    const instance = MailerCustomLogger.getInstance();
    expect(instance).toBeInstanceOf(MailerCustomLogger);
  });

  it('should log trace messages if trace level is enabled', () => {
    mailerCustomLogger.trace({ tnx: 'server' }, 'message');
    expect(logger.log).toHaveBeenCalledWith('S: message');
  });

  it('should log debug messages if debug level is enabled', () => {
    mailerCustomLogger.debug({ tnx: 'client' }, 'message');
    expect(logger.debug).toHaveBeenCalledWith('C: message');
  });

  it('should log info messages if info level is enabled', () => {
    mailerCustomLogger.info({ tnx: 'server' }, 'message');
    expect(logger.log).toHaveBeenCalledWith('S: message');
  });

  it('should log warn messages if warn level is enabled', () => {
    mailerCustomLogger.warn({ tnx: 'client' }, 'message');
    expect(logger.warn).toHaveBeenCalledWith('C: message');
  });

  it('should log error messages if error level is enabled', () => {
    mailerCustomLogger.error({ tnx: 'server' }, 'message');
    expect(logger.error).toHaveBeenCalledWith('S: message');
  });

  it('should log fatal messages if fatal level is enabled', () => {
    mailerCustomLogger.fatal({ tnx: 'client' }, 'message');
    expect(logger.error).toHaveBeenCalledWith('C: message');
  });

  it('should log messages using log method', () => {
    mailerCustomLogger.log('message');
    expect(logger.log).toHaveBeenCalledWith('message');
  });

  it('should return correct prefix from getPrefix', () => {
    const entry = { tnx: 'server', sid: '123', cid: '456' };
    const prefix = mailerCustomLogger['getPrefix'](entry);
    expect(prefix).toBe('[#456] [123] S: ');
  });
});

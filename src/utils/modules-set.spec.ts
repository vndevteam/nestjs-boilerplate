import { ApiModule } from '@/api/api.module';
import { MailModule } from '@/mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import generateModulesSet from './modules-set';

describe('generateModulesSet', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return correct modules for monolith set', () => {
    process.env.MODULES_SET = 'monolith';
    const modules = generateModulesSet();
    expect(modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          module: ConfigModule,
        }),
        ApiModule,
        expect.any(Object), // TypeOrmModule
        expect.any(Object), // I18nModule
        expect.any(Object), // LoggerModule
        MailModule,
      ]),
    );
  });

  it('should return correct modules for default set', () => {
    process.env.MODULES_SET = undefined;
    const modules = generateModulesSet();
    expect(modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          module: ConfigModule,
        }),
      ]),
    );
  });

  it('should return correct modules for api set', () => {
    process.env.MODULES_SET = 'api';
    const modules = generateModulesSet();
    expect(modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          module: ConfigModule,
        }),
        ApiModule,
        expect.any(Object), // TypeOrmModule
        expect.any(Object), // I18nModule
        expect.any(Object), // LoggerModule
        MailModule,
      ]),
    );
  });

  it('should handle unsupported modules set', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    process.env.MODULES_SET = 'unsupported';
    const modules = generateModulesSet();
    expect(modules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          module: ConfigModule,
        }),
      ]),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Unsupported modules set: unsupported',
    );
    consoleErrorSpy.mockRestore();
  });
});

import mailConfig from './mail.config';

describe('MailConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env to its original state before each test
    process.env = { ...originalEnv };
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
  });

  it('should return the mail configuration', async () => {
    process.env.MAIL_HOST = 'smtp.example.com';
    process.env.MAIL_PORT = '465';
    process.env.MAIL_USER = 'user@example.com';
    process.env.MAIL_PASS = 'password';
    process.env.MAIL_IGNORE_TLS = 'false';
    process.env.MAIL_SECURE = 'false';
    process.env.MAIL_REQUIRE_TLS = 'false';
    process.env.MAIL_DEFAULT_EMAIL = 'default@example.com';
    process.env.MAIL_DEFAULT_NAME = 'Default Name';

    const config = await mailConfig();

    expect(config.host).toBe('smtp.example.com');
    expect(config.port).toBe(465);
    expect(config.user).toBe('user@example.com');
    expect(config.password).toBe('password');
    expect(config.ignoreTLS).toBe(false);
    expect(config.secure).toBe(false);
    expect(config.requireTLS).toBe(false);
    expect(config.defaultEmail).toBe('default@example.com');
    expect(config.defaultName).toBe('Default Name');
  });

  describe('host', () => {
    it('should throw an error if MAIL_HOST is an empty string', async () => {
      process.env.MAIL_HOST = '';
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });

    it('should throw an error if MAIL_HOST is not set', async () => {
      delete process.env.MAIL_HOST;
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });
  });

  describe('port', () => {
    it('should return 587 when MAIL_PORT is an empty string', async () => {
      process.env.MAIL_PORT = '';
      const config = await mailConfig();
      expect(config.port).toBe(587);
    });

    it('should throw an error if MAIL_PORT is not a number', async () => {
      process.env.MAIL_PORT = 'invalid-port';
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });

    it('should return 587 when MAIL_PORT is not set', async () => {
      delete process.env.MAIL_PORT;
      const config = await mailConfig();
      expect(config.port).toBe(587);
    });
  });

  describe('user', () => {
    it('should return an empty string when MAIL_USER is an empty string', async () => {
      process.env.MAIL_USER = '';
      const config = await mailConfig();
      expect(config.user).toBe('');
    });

    it('should return undefined if MAIL_USER is not set', async () => {
      delete process.env.MAIL_USER;
      const config = await mailConfig();
      expect(config.user).toBe(undefined);
    });
  });

  describe('password', () => {
    it('should return an empty string when MAIL_PASSWORD is an empty string', async () => {
      process.env.MAIL_PASSWORD = '';
      const config = await mailConfig();
      expect(config.password).toBe('');
    });

    it('should return undefined if MAIL_PASSWORD is not set', async () => {
      delete process.env.MAIL_PASSWORD;
      const config = await mailConfig();
      expect(config.password).toBe(undefined);
    });
  });

  describe('ignoreTLS', () => {
    it('should return true when MAIL_IGNORE_TLS is true', async () => {
      process.env.MAIL_IGNORE_TLS = 'true';
      const config = await mailConfig();
      expect(config.ignoreTLS).toBe(true);
    });

    it('should return false when MAIL_IGNORE_TLS is false', async () => {
      process.env.MAIL_IGNORE_TLS = 'false';
      const config = await mailConfig();
      expect(config.ignoreTLS).toBe(false);
    });

    it('should throw an error when MAIL_IGNORE_TLS is not set', async () => {
      delete process.env.MAIL_IGNORE_TLS;
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });
  });

  describe('secure', () => {
    it('should return true when MAIL_SECURE is true', async () => {
      process.env.MAIL_SECURE = 'true';
      const config = await mailConfig();
      expect(config.secure).toBe(true);
    });

    it('should return false when MAIL_SECURE is false', async () => {
      process.env.MAIL_SECURE = 'false';
      const config = await mailConfig();
      expect(config.secure).toBe(false);
    });

    it('should throw an error when MAIL_SECURE is not set', async () => {
      delete process.env.MAIL_SECURE;
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });
  });

  describe('requireTLS', () => {
    it('should return true when MAIL_REQUIRE_TLS is true', async () => {
      process.env.MAIL_REQUIRE_TLS = 'true';
      const config = await mailConfig();
      expect(config.requireTLS).toBe(true);
    });

    it('should return false when MAIL_REQUIRE_TLS is false', async () => {
      process.env.MAIL_REQUIRE_TLS = 'false';
      const config = await mailConfig();
      expect(config.requireTLS).toBe(false);
    });

    it('should throw an error when MAIL_REQUIRE_TLS is not set', async () => {
      delete process.env.MAIL_REQUIRE_TLS;
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });
  });

  describe('defaultEmail', () => {
    it('should throw an error if MAIL_DEFAULT_EMAIL is not a valid email', async () => {
      process.env.MAIL_DEFAULT_EMAIL = 'invalid-email';
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });

    it('should throw an error if MAIL_DEFAULT_EMAIL is an empty string', async () => {
      process.env.MAIL_DEFAULT_EMAIL = '';
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });

    it('should throw an error if MAIL_DEFAULT_EMAIL is not set', async () => {
      delete process.env.MAIL_DEFAULT_EMAIL;
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });
  });

  describe('defaultName', () => {
    it('should return an empty string when MAIL_DEFAULT_NAME is an empty string', async () => {
      process.env.MAIL_DEFAULT_NAME = '';
      const config = await mailConfig();
      expect(config.defaultName).toBe('');
    });

    it('should throw an error if MAIL_DEFAULT_NAME is not set', async () => {
      delete process.env.MAIL_DEFAULT_NAME;
      await expect(async () => await mailConfig()).rejects.toThrow(Error);
    });
  });
});

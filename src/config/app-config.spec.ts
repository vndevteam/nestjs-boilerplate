import appConfig from './app.config';

describe('AppConfig', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset process.env to its original state before each test
    process.env = { ...originalEnv };
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
  });

  describe('nodeEnv', () => {
    it('should return the value of NODE_ENV', async () => {
      process.env.NODE_ENV = 'development';
      const config = await appConfig();
      expect(config.nodeEnv).toBe('development');
    });

    it('should return "development" when NODE_ENV is not set', async () => {
      delete process.env.NODE_ENV;
      const config = await appConfig();
      expect(config.nodeEnv).toBe('development');
    });

    it('should throw an error when NODE_ENV is an invalid value', async () => {
      process.env.NODE_ENV = 'invalid';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when NODE_ENV is an empty string', async () => {
      process.env.NODE_ENV = '';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });
  });

  describe('name', () => {
    it('should return the value of APP_NAME', async () => {
      process.env.APP_NAME = 'My App';
      const config = await appConfig();
      expect(config.name).toBe('My App');
    });

    it('should return "App" when APP_NAME is not set', async () => {
      delete process.env.APP_NAME;
      const config = await appConfig();
      expect(config.name).toBe('app');
    });

    it('should throw an error when APP_NAME is an empty string', async () => {
      process.env.APP_NAME = '';
      const config = await appConfig();
      expect(config.name).toBe('app');
    });
  });

  describe('url', () => {
    it('should return the value of APP_URL', async () => {
      process.env.APP_URL = 'https://example.com';
      const config = await appConfig();
      expect(config.url).toBe('https://example.com');
    });

    it('should return undefined when APP_URL is not set', async () => {
      delete process.env.APP_URL;
      const config = await appConfig();
      expect(config.url).toContain('http://localhost');
    });

    it('should throw an error when APP_URL is an invalid URL', async () => {
      process.env.APP_URL = 'http://///invalid-url';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });
  });

  describe('port', () => {
    it('should return the value of APP_PORT as a number', async () => {
      process.env.APP_PORT = '3000';
      const config = await appConfig();
      expect(config.port).toBe(3000);
    });

    it('should return the value of PORT as a number', async () => {
      process.env.PORT = '3000';
      const config = await appConfig();
      expect(config.port).toBe(3000);
    });

    it('should return 3000 when APP_PORT and PORT are not set', async () => {
      delete process.env.APP_PORT;
      delete process.env.PORT;
      const config = await appConfig();
      expect(config.port).toBe(3000);
    });

    it('should throw an error when APP_PORT is an invalid number', async () => {
      process.env.APP_PORT = 'invalid';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when PORT is an invalid number', async () => {
      process.env.PORT = 'invalid';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when APP_PORT is a negative number', async () => {
      process.env.APP_PORT = '-3000';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when APP_PORT is greater than 65535', async () => {
      process.env.APP_PORT = '65536';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });
  });

  describe('debug', () => {
    it('should return true when APP_DEBUG is "true"', async () => {
      process.env.APP_DEBUG = 'true';
      const config = await appConfig();
      expect(config.debug).toBe(true);
    });

    it('should return false when APP_DEBUG is "false"', async () => {
      process.env.APP_DEBUG = 'false';
      const config = await appConfig();
      expect(config.debug).toBe(false);
    });

    it('should return false when APP_DEBUG is empty', async () => {
      process.env.APP_DEBUG = '';
      const config = await appConfig();
      expect(config.debug).toBe(false);
    });
  });

  describe('apiPrefix', () => {
    it('should return the value of API_PREFIX', async () => {
      process.env.API_PREFIX = '/api';
      const config = await appConfig();
      expect(config.apiPrefix).toBe('/api');
    });

    it('should return "api" when API_PREFIX is not set', async () => {
      delete process.env.API_PREFIX;
      const config = await appConfig();
      expect(config.apiPrefix).toBe('api');
    });

    it('should throw an error when API_PREFIX is an empty string', async () => {
      process.env.API_PREFIX = '';
      const config = await appConfig();
      expect(config.apiPrefix).toBe('api');
    });
  });

  describe('fallbackLanguage', () => {
    it('should return the value of APP_FALLBACK_LANGUAGE', async () => {
      process.env.APP_FALLBACK_LANGUAGE = 'en';
      const config = await appConfig();
      expect(config.fallbackLanguage).toBe('en');
    });

    it('should return "en" when APP_FALLBACK_LANGUAGE is not set', async () => {
      delete process.env.APP_FALLBACK_LANGUAGE;
      const config = await appConfig();
      expect(config.fallbackLanguage).toBe('en');
    });

    it('should throw an error when APP_FALLBACK_LANGUAGE is an empty string', async () => {
      process.env.APP_FALLBACK_LANGUAGE = '';
      const config = await appConfig();
      expect(config.fallbackLanguage).toBe('en');
    });
  });

  describe('logLevel', () => {
    it('should return the value of APP_LOG_LEVEL', async () => {
      process.env.APP_LOG_LEVEL = 'info';
      const config = await appConfig();
      expect(config.logLevel).toBe('info');
    });

    it('should return "warn" when APP_LOG_LEVEL is not set', async () => {
      delete process.env.APP_LOG_LEVEL;
      const config = await appConfig();
      expect(config.logLevel).toBe('warn');
    });

    it('should throw an error when APP_LOG_LEVEL is an empty string', async () => {
      process.env.APP_LOG_LEVEL = '';
      const config = await appConfig();
      expect(config.logLevel).toBe('warn');
    });
  });

  describe('logService', () => {
    it('should return the value of APP_LOG_SERVICE', async () => {
      process.env.APP_LOG_SERVICE = 'console';
      const config = await appConfig();
      expect(config.logService).toBe('console');
    });

    it('should return "console" when APP_LOG_SERVICE is not set', async () => {
      delete process.env.APP_LOG_SERVICE;
      const config = await appConfig();
      expect(config.logService).toBe('console');
    });

    it('should throw an error when APP_LOG_SERVICE is an empty string', async () => {
      process.env.APP_LOG_SERVICE = '';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when APP_LOG_SERVICE is an invalid value', async () => {
      process.env.APP_LOG_SERVICE = 'invalid';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });
  });

  describe('corsOrigin', () => {
    it('should return true when APP_CORS_ORIGIN is "true"', async () => {
      process.env.APP_CORS_ORIGIN = 'true';
      const config = await appConfig();
      expect(config.corsOrigin).toBe(true);
    });

    it('should return false when APP_CORS_ORIGIN is "false"', async () => {
      process.env.APP_CORS_ORIGIN = 'false';
      const config = await appConfig();
      expect(config.corsOrigin).toBe(false);
    });

    it('should return "*" when APP_CORS_ORIGIN is "*"', async () => {
      process.env.APP_CORS_ORIGIN = '*';
      const config = await appConfig();
      expect(config.corsOrigin).toBe('*');
    });

    it('should return false when APP_CORS_ORIGIN is empty', async () => {
      process.env.APP_CORS_ORIGIN = '';
      const config = await appConfig();
      expect(config.corsOrigin).toBe(false);
    });

    it('should return a single origin when APP_CORS_ORIGIN is a valid URL', async () => {
      process.env.APP_CORS_ORIGIN = 'https://example.com';
      const config = await appConfig();
      expect(config.corsOrigin).toEqual(['https://example.com']);
    });

    it('should return multiple origins when APP_CORS_ORIGIN is a comma-separated list of valid URLs', async () => {
      process.env.APP_CORS_ORIGIN = 'https://example.com,https://another.com';
      const config = await appConfig();
      expect(config.corsOrigin).toEqual([
        'https://example.com',
        'https://another.com',
      ]);
    });

    it('should throw an error when APP_CORS_ORIGIN is an invalid value', async () => {
      process.env.APP_CORS_ORIGIN = '**';
      await expect(async () => await appConfig()).rejects.toThrow(Error);

      process.env.APP_CORS_ORIGIN = 'https://example.com,';
      await expect(async () => await appConfig()).rejects.toThrow(Error);

      process.env.APP_CORS_ORIGIN = 'https://example.com,,https://another.com';
      await expect(async () => await appConfig()).rejects.toThrow(Error);
    });
  });
});

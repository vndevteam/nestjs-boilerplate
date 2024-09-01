import authConfig from './auth.config';

describe('AuthConfig', () => {
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

  describe('secret', () => {
    it('should return the value of AUTH_JWT_SECRET', async () => {
      process.env.AUTH_JWT_SECRET = 'secret';
      const config = await authConfig();
      expect(config.secret).toBe('secret');
    });

    it('should throw an error when AUTH_JWT_SECRET is an empty', async () => {
      process.env.AUTH_JWT_SECRET = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_JWT_SECRET is not set', async () => {
      delete process.env.AUTH_JWT_SECRET;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('expires', () => {
    it('should return the value of AUTH_JWT_TOKEN_EXPIRES_IN', async () => {
      process.env.AUTH_JWT_TOKEN_EXPIRES_IN = '1d';
      const config = await authConfig();
      expect(config.expires).toBe('1d');
    });

    it('should throw an error when AUTH_JWT_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.AUTH_JWT_TOKEN_EXPIRES_IN = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_JWT_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.AUTH_JWT_TOKEN_EXPIRES_IN;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_JWT_TOKEN_EXPIRES_IN is not a valid ms', async () => {
      process.env.AUTH_JWT_TOKEN_EXPIRES_IN = 'invalid';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('refreshSecret', () => {
    it('should return the value of AUTH_REFRESH_SECRET', async () => {
      process.env.AUTH_REFRESH_SECRET = 'secret';
      const config = await authConfig();
      expect(config.refreshSecret).toBe('secret');
    });

    it('should throw an error when AUTH_REFRESH_SECRET is an empty', async () => {
      process.env.AUTH_REFRESH_SECRET = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_REFRESH_SECRET is not set', async () => {
      delete process.env.AUTH_REFRESH_SECRET;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('refreshExpires', () => {
    it('should return the value of AUTH_REFRESH_TOKEN_EXPIRES_IN', async () => {
      process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN = '1d';
      const config = await authConfig();
      expect(config.refreshExpires).toBe('1d');
    });

    it('should throw an error when AUTH_REFRESH_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_REFRESH_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_REFRESH_TOKEN_EXPIRES_IN is not a valid ms', async () => {
      process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN = 'invalid';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('forgotSecret', () => {
    it('should return the value of AUTH_FORGOT_SECRET', async () => {
      process.env.AUTH_FORGOT_SECRET = 'secret';
      const config = await authConfig();
      expect(config.forgotSecret).toBe('secret');
    });

    it('should throw an error when AUTH_FORGOT_SECRET is an empty', async () => {
      process.env.AUTH_FORGOT_SECRET = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_FORGOT_SECRET is not set', async () => {
      delete process.env.AUTH_FORGOT_SECRET;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('forgotExpires', () => {
    it('should return the value of AUTH_FORGOT_TOKEN_EXPIRES_IN', async () => {
      process.env.AUTH_FORGOT_TOKEN_EXPIRES_IN = '1d';
      const config = await authConfig();
      expect(config.forgotExpires).toBe('1d');
    });

    it('should throw an error when AUTH_FORGOT_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.AUTH_FORGOT_TOKEN_EXPIRES_IN = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_FORGOT_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.AUTH_FORGOT_TOKEN_EXPIRES_IN;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_FORGOT_TOKEN_EXPIRES_IN is not a valid ms', async () => {
      process.env.AUTH_FORGOT_TOKEN_EXPIRES_IN = 'invalid';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('confirmEmailSecret', () => {
    it('should return the value of AUTH_CONFIRM_EMAIL_SECRET', async () => {
      process.env.AUTH_CONFIRM_EMAIL_SECRET = 'secret';
      const config = await authConfig();
      expect(config.confirmEmailSecret).toBe('secret');
    });

    it('should throw an error when AUTH_CONFIRM_EMAIL_SECRET is an empty', async () => {
      process.env.AUTH_CONFIRM_EMAIL_SECRET = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_CONFIRM_EMAIL_SECRET is not set', async () => {
      delete process.env.AUTH_CONFIRM_EMAIL_SECRET;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });

  describe('confirmEmailExpires', () => {
    it('should return the value of AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN', async () => {
      process.env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN = '1d';
      const config = await authConfig();
      expect(config.confirmEmailExpires).toBe('1d');
    });

    it('should throw an error when AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN is an empty', async () => {
      process.env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN = '';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN is not set', async () => {
      delete process.env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN;
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN is not a valid ms', async () => {
      process.env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN = 'invalid';
      await expect(async () => await authConfig()).rejects.toThrow(Error);
    });
  });
});

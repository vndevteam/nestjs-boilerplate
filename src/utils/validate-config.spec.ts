import validateConfig from '@/utils/validate-config';
import { IsNumber, IsString } from 'class-validator';
import 'reflect-metadata';

class EnvVariables {
  @IsString()
  DATABASE_HOST: string;

  @IsNumber()
  DATABASE_PORT: number;
}

describe('validateConfig', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation();
  });

  it('should return validated config for valid input', () => {
    const config = {
      DATABASE_HOST: 'localhost',
      DATABASE_PORT: 5432,
    };

    const result = validateConfig(config, EnvVariables);

    expect(result).toEqual({
      DATABASE_HOST: 'localhost',
      DATABASE_PORT: 5432,
    });
  });

  it('should throw an error for missing properties', () => {
    const config = {
      DATABASE_HOST: 'localhost',
    };

    expect(() => validateConfig(config, EnvVariables)).toThrow(
      /Error in DATABASE_PORT:/,
    );
  });

  it('should throw an error for incorrect types', () => {
    const config = {
      DATABASE_HOST: 'localhost',
      DATABASE_PORT: 'not-a-number',
    };

    expect(() => validateConfig(config, EnvVariables)).toThrow(
      /Error in DATABASE_PORT:/,
    );
  });
});

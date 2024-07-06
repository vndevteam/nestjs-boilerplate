import { ValidateIf, type ValidationOptions } from 'class-validator';

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== null, options);
}

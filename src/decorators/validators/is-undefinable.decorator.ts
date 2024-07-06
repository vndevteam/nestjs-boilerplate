import { ValidateIf, type ValidationOptions } from 'class-validator';

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_obj, value) => value !== undefined, options);
}

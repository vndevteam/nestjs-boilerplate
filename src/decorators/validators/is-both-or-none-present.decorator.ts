import {
  type ValidationArguments,
  type ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsBothOrNonePresent(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsBothOrNonePresent',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (value && relatedValue) || (!value && !relatedValue);
        },
        defaultMessage(args: ValidationArguments) {
          return `$property and ${args.constraints[0]} must be both provided or omitted`;
        },
      },
    });
  };
}

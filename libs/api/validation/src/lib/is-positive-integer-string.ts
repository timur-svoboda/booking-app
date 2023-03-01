import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPositiveIntegerString', async: false })
export class IsPositiveIntegerString implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    return typeof value === 'string' && /^[1-9]\d*$/.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be a string that contains positive integer';
  }
}

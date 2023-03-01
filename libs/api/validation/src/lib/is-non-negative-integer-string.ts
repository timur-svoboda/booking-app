import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNonNegativeIntegerString', async: false })
export class IsNonNegativeIntegerString
  implements ValidatorConstraintInterface
{
  validate(value: unknown, args: ValidationArguments) {
    return typeof value === 'string' && /^\d+$/.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be a string that contains positive integer';
  }
}

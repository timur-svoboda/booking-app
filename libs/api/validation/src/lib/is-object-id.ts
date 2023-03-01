import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint({ name: 'isObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    return typeof value === 'string' && isValidObjectId(value);
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be a string that contains positive integer';
  }
}

import { IsOptional, Validate } from 'class-validator';
import { GetManyDto as IGetManyDto } from '@booking-app/shared/dtos';
import {
  IsNonNegativeIntegerString,
  IsPositiveIntegerString,
} from '@booking-app/api/validation';

export class GetManyDto implements IGetManyDto {
  @IsOptional()
  @Validate(IsPositiveIntegerString)
  limit: string;

  @IsOptional()
  @Validate(IsNonNegativeIntegerString)
  skip: string;
}

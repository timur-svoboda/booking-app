import { IsDateString, Validate } from 'class-validator';
import { IsObjectId } from '@booking-app/api/validation';
import { CreateReservationDto as ICreateReservationDto } from '@booking-app/shared/dtos';

export class CreateReservationDto implements ICreateReservationDto {
  @Validate(IsObjectId)
  stayId!: string;

  @IsDateString()
  from!: string;

  @IsDateString()
  to!: string;
}

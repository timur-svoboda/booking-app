import { IsObjectId } from '@booking-app/api/validation';
import { IsOptional, Validate } from 'class-validator';
import { GetManyReservationsDto as IGetManyReservationsDto } from '@booking-app/shared/dtos';

export class GetManyReservationsDto implements IGetManyReservationsDto {
  @Validate(IsObjectId)
  @IsOptional()
  stayId!: string;
}

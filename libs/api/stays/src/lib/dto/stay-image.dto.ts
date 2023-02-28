import { StayImageDto as IStayImageDto } from '@booking-app/shared/dtos';

export class StayImageDto implements IStayImageDto {
  thumbnail: string;
  mainImage: string;
}

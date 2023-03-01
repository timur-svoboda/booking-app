import { StayImagesUrlsDto as IStayImagesUrlsDto } from '@booking-app/shared/dtos';

export class StayImagesUrlsDto implements IStayImagesUrlsDto {
  thumbnail: string;
  mainImage: string;
}

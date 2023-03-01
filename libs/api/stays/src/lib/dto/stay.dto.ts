import { StayDto as IStayDto } from '@booking-app/shared/dtos';
import { StayDocument } from '../schemas/stay.schema';

export class StayDto implements IStayDto {
  id: IStayDto['id'];
  hostId: IStayDto['hostId'];
  title: IStayDto['title'];
  description: IStayDto['description'];
  images: IStayDto['images'];
  pricePerNight: IStayDto['pricePerNight'];
  minimumLengthOfStay: IStayDto['minimumLengthOfStay'];
  reservationPeriod: IStayDto['reservationPeriod'];

  constructor(stayDoc: StayDocument) {
    this.id = stayDoc._id.toString();
    this.hostId = stayDoc.hostId;
    this.title = stayDoc.title;
    this.description = stayDoc.description;
    this.images = stayDoc.images.map((image) => ({
      mainUrl: image.mainUrl,
      thumbnailUrl: image.thumbnailUrl,
      description: image.description,
    }));
    this.pricePerNight = stayDoc.pricePerNight;
    this.minimumLengthOfStay = stayDoc.minimumLengthOfStay;
    this.reservationPeriod = stayDoc.reservationPeriod;
  }
}

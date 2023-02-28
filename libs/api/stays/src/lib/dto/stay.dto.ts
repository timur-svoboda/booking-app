import { StayDto as IStayDto } from '@booking-app/shared/dtos';
import { StayDocument } from '../schemas/stay.schema';

export class StayDto implements IStayDto {
  id: IStayDto['id'];
  hostId: IStayDto['hostId'];
  title: IStayDto['title'];
  description: IStayDto['description'];
  images: IStayDto['images'];

  constructor(stayDoc: StayDocument) {
    this.id = stayDoc._id.toString();
    this.hostId = stayDoc.hostId;
    this.title = stayDoc.title;
    this.description = stayDoc.description;
    this.images = stayDoc.images.map((image) => ({
      url: image.url,
      description: image.description,
    }));
  }
}

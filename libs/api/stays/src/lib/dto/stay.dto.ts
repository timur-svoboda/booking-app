import { StayDocument } from '../schemas/stay.schema';
import { StayDto as IStayDto } from '@booking-app/shared/dtos';

export class StayDto implements IStayDto {
  id: string;
  hostId: string;
  title: string;
  description: string;

  constructor(stayDoc: StayDocument) {
    this.id = stayDoc._id.toString();
    this.hostId = stayDoc.hostId;
    this.title = stayDoc.title;
    this.description = stayDoc.description;
  }
}

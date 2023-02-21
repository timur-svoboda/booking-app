import { StayDocument } from '../schemas/stay.schema';

export class StayDto {
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

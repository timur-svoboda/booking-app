import { StayDocument } from '../schemas/stay.schema';

export class StayDto {
  id: string;
  ownerId: string;
  title: string;
  description: string;

  constructor(stayDoc: StayDocument) {
    this.id = stayDoc._id.toString();
    this.ownerId = stayDoc.ownerId;
    this.title = stayDoc.title;
    this.description = stayDoc.description;
  }
}

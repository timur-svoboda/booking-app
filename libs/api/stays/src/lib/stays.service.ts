import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStayDto } from './dto/create-stay.dto';
import { Stay, StayDocument } from './schemas/stay.schema';

@Injectable()
export class StaysService {
  constructor(@InjectModel(Stay.name) private catModel: Model<StayDocument>) {}

  create(data: CreateStayDto & { ownerId: string }) {
    return this.catModel.create(data);
  }
}

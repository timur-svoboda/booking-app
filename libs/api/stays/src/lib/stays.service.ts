import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import sharp from 'sharp';
import { Readable } from 'stream';
import { CreateStayDto } from './dto/create-stay.dto';
import { Stay, StayDocument } from './schemas/stay.schema';

@Injectable()
export class StaysService {
  constructor(@InjectModel(Stay.name) private catModel: Model<StayDocument>) {}

  create(data: CreateStayDto & { hostId: string }) {
    return this.catModel.create(data);
  }

  async createThumbnail(file: Express.Multer.File) {
    const thumbnail = await sharp(file.buffer)
      .resize({ width: 100, height: 100, fit: 'cover' })
      .webp()
      .toFile('test.webp');
  }
}

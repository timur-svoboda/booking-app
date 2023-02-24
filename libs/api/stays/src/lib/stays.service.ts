import sharp from 'sharp';
import { Model } from 'mongoose';
import * as uuid from 'uuid';
import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STORAGE, TEMP_IMAGES_BUCKET_ID } from '@booking-app/api/cloud-storage';
import { CreateStayDto } from './dto/create-stay.dto';
import { Stay, StayDocument } from './schemas/stay.schema';

@Injectable()
export class StaysService {
  constructor(
    @InjectModel(Stay.name) private catModel: Model<StayDocument>,
    @Inject(STORAGE) private storage: Storage
  ) {}

  create(data: CreateStayDto & { hostId: string }) {
    return this.catModel.create(data);
  }

  async createThumbnail(file: Express.Multer.File) {
    const thumbnail = await sharp(file.buffer)
      .resize({ width: 100, height: 100, fit: 'cover' })
      .webp()
      .toBuffer();

    this.storage
      .bucket(TEMP_IMAGES_BUCKET_ID)
      .file(`${uuid.v4()}.webp`)
      .save(thumbnail);
  }
}

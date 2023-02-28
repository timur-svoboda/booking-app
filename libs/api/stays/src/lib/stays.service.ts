import sharp from 'sharp';
import path from 'path';
import * as uuid from 'uuid';
import { Model } from 'mongoose';
import { Storage } from '@google-cloud/storage';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IMAGES_BUCKET_ID,
  STORAGE,
  TEMP_IMAGES_BUCKET_ID,
} from '@booking-app/api/cloud-storage';
import { CreateStayDto } from './dto/create-stay.dto';
import { Stay, StayDocument } from './schemas/stay.schema';

@Injectable()
export class StaysService {
  constructor(
    @InjectModel(Stay.name) private catModel: Model<StayDocument>,
    @Inject(STORAGE) private storage: Storage
  ) {}

  async create(data: CreateStayDto & { hostId: string }) {
    const permanentImages = await Promise.all(
      await data.images.map(async (image) => {
        const filename = path.basename(image.url);
        const destFile = this.storage.bucket(IMAGES_BUCKET_ID).file(filename);
        await this.storage
          .bucket(TEMP_IMAGES_BUCKET_ID)
          .file(filename)
          .move(destFile);
        return {
          ...image,
          url: destFile.publicUrl(),
        };
      })
    );
    return this.catModel.create({
      ...data,
      images: permanentImages,
    });
  }

  async createImage(file: Express.Multer.File) {
    // Save thumbnail
    const thumbnailFile = this.storage
      .bucket(TEMP_IMAGES_BUCKET_ID)
      .file(`${uuid.v4()}.webp`);

    const thumbnailBuffer = await sharp(file.buffer)
      .resize({ width: 100, height: 100, fit: 'cover' })
      .webp()
      .toBuffer();

    await thumbnailFile.save(thumbnailBuffer, { resumable: false });

    // Save main image
    const mainImageFile = this.storage
      .bucket(TEMP_IMAGES_BUCKET_ID)
      .file(`${uuid.v4()}.webp`);

    const mainImageFileBuffer = await sharp(file.buffer)
      .resize({ width: 600 })
      .webp()
      .toBuffer();

    await mainImageFile.save(mainImageFileBuffer, { resumable: false });

    return {
      thumbnail: thumbnailFile.publicUrl(),
      mainImage: mainImageFile.publicUrl(),
    };
  }
}

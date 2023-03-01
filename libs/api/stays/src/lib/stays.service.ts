import sharp from 'sharp';
import path from 'path';
import * as uuid from 'uuid';
import { FilterQuery, Model } from 'mongoose';
import { Storage } from '@google-cloud/storage';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IMAGES_BUCKET_ID,
  STORAGE,
  TEMP_IMAGES_BUCKET_ID,
} from '@booking-app/api/cloud-storage';
import { CreateStayDto } from './dto/create-stay.dto';
import { Stay, StayDocument } from './schemas/stay.schema';
import { UpdateStayDto } from './dto/update-stay.dto';
import { GetManyDto } from './dto/get-many.dto';

@Injectable()
export class StaysService {
  constructor(
    @InjectModel(Stay.name) private stayModel: Model<StayDocument>,
    @Inject(STORAGE) private storage: Storage
  ) {}

  async create(data: CreateStayDto & { hostId: string }) {
    const permanentImages = await Promise.all(
      await data.images.map(async (image) => {
        const mainUrl = await this.makeImagePermanent(image.mainUrl);
        const thumbnailUrl = await this.makeImagePermanent(image.thumbnailUrl);
        return { ...image, mainUrl, thumbnailUrl };
      })
    );
    return this.stayModel.create({ ...data, images: permanentImages });
  }

  async getOne(id: string) {
    const stayDoc = await this.stayModel.findById(id);
    if (stayDoc === null) {
      throw new NotFoundException();
    }
    return stayDoc;
  }

  getMany(getManyDto: GetManyDto) {
    const filter: FilterQuery<StayDocument> = {};
    if (getManyDto.hostId) {
      filter.hostId = getManyDto.hostId;
    }
    return this.stayModel
      .find(filter)
      .skip(+getManyDto.skip || 0)
      .limit(+getManyDto.limit || 5);
  }

  async update(id: string, data: UpdateStayDto & { hostId: string }) {
    const stayDoc = await this.stayModel.findById(id);
    if (stayDoc === null) {
      throw new NotFoundException();
    }
    if (stayDoc.hostId !== data.hostId) {
      throw new UnauthorizedException();
    }
    const images = await Promise.all(
      await data.images.map(async (image) => {
        let { mainUrl, thumbnailUrl } = image;
        if (mainUrl.includes(TEMP_IMAGES_BUCKET_ID)) {
          mainUrl = await this.makeImagePermanent(mainUrl);
        }
        if (thumbnailUrl.includes(TEMP_IMAGES_BUCKET_ID)) {
          thumbnailUrl = await this.makeImagePermanent(thumbnailUrl);
        }
        return { ...image, mainUrl, thumbnailUrl };
      })
    );
    await stayDoc.updateOne({ ...data, images });
    return this.stayModel.findById(id);
  }

  async delete(stayId: string, data: { userId: string }) {
    const stayDocument = await this.stayModel.findById(stayId);
    if (stayDocument.hostId !== data.userId) {
      throw new UnauthorizedException();
    }
    return this.stayModel.findByIdAndDelete(stayId);
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

  private async makeImagePermanent(url: string) {
    const destFile = this.storage
      .bucket(IMAGES_BUCKET_ID)
      .file(`${uuid.v4()}.webp`);
    await this.storage
      .bucket(TEMP_IMAGES_BUCKET_ID)
      .file(path.basename(url))
      .move(destFile);
    return destFile.publicUrl();
  }
}

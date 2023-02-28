import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  Length,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStayDto as ICreateStayDto } from '@booking-app/shared/dtos';
import { TEMP_IMAGES_BUCKET_ID } from '@booking-app/api/cloud-storage';

export class CreateStayDto implements ICreateStayDto {
  @Length(3, 100, {
    message: 'It must be a string between 3 and 100 characters long',
  })
  title: ICreateStayDto['title'];

  @Length(80, 450, {
    message: 'It must be a string between 80 and 450 characters long',
  })
  description: ICreateStayDto['description'];

  @IsArray()
  @ArrayMinSize(1, {
    message: 'The number of images must be greater than or equals to 1',
  })
  @ArrayMaxSize(10, {
    message: 'The number of images must be lower than or equals to 10',
  })
  @ValidateNested()
  @Type(() => StayImage)
  images: StayImage[];
}

class StayImage {
  @Matches(
    new RegExp(
      `^https:\/\/storage.googleapis.com\/${TEMP_IMAGES_BUCKET_ID}\/.*\.webp$`
    )
  )
  url: ICreateStayDto['images'][number]['url'];

  @Length(0, 100, {
    message: 'It must not be longer than 100 characters',
  })
  description: ICreateStayDto['images'][number]['description'];
}

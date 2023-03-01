import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  Length,
  ValidateNested,
  Matches,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { CreateStayDto as ICreateStayDto } from '@booking-app/shared/dtos';
import {
  IMAGES_BUCKET_ID,
  TEMP_IMAGES_BUCKET_ID,
} from '@booking-app/api/cloud-storage';

export class CreateStayDto implements ICreateStayDto {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(3, 100, {
    message: 'It must be a string between 3 and 100 characters long',
  })
  title: ICreateStayDto['title'];

  @Transform(({ value }: TransformFnParams) => value?.trim())
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
  @Type(() => TempStayImage)
  images: TempStayImage[];

  @IsPositive()
  pricePerNight: ICreateStayDto['pricePerNight'];

  @IsPositive()
  @IsOptional()
  minimumLengthOfStay?: ICreateStayDto['minimumLengthOfStay'];

  @IsPositive()
  @IsOptional()
  reservationPeriod?: ICreateStayDto['reservationPeriod'];
}

class TempStayImage {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(
    new RegExp(
      `^https:\/\/storage.googleapis.com\/(${TEMP_IMAGES_BUCKET_ID}|${IMAGES_BUCKET_ID})\/.*\.webp$`
    )
  )
  mainUrl: ICreateStayDto['images'][number]['mainUrl'];

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Matches(
    new RegExp(
      `^https:\/\/storage.googleapis.com\/(${TEMP_IMAGES_BUCKET_ID}|${IMAGES_BUCKET_ID})\/.*\.webp$`
    )
  )
  thumbnailUrl: ICreateStayDto['images'][number]['thumbnailUrl'];

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Length(0, 100, {
    message: 'It must not be longer than 100 characters',
  })
  description: ICreateStayDto['images'][number]['description'];
}

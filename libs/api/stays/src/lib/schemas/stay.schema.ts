import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StayImage, StayImageSchema } from './stay-image.schema';

export type StayDocument = HydratedDocument<Stay>;

@Schema()
export class Stay {
  @Prop({ required: true })
  hostId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [StayImageSchema], required: true })
  images: StayImage[];

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ default: 1 })
  minimumLengthOfStay: number;

  @Prop({ default: 3 })
  reservationPeriod: number;
}

export const StaySchema = SchemaFactory.createForClass(Stay);

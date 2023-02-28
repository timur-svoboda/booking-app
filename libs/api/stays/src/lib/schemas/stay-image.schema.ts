import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StayImageDocument = HydratedDocument<StayImage>;

@Schema()
export class StayImage {
  @Prop({ required: true })
  url: string;

  @Prop({ default: '' })
  description: string;
}

export const StayImageSchema = SchemaFactory.createForClass(StayImage);

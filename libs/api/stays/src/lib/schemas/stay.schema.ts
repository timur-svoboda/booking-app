import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StayDocument = HydratedDocument<Stay>;

@Schema()
export class Stay {
  @Prop({ required: true })
  ownerId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;
}

export const StaySchema = SchemaFactory.createForClass(Stay);

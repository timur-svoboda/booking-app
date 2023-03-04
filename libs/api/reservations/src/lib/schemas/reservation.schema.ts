import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ required: true }) stayId!: string;
  @Prop({ required: true }) guestId!: string;
  @Prop({ required: true }) from!: string;
  @Prop({ required: true }) to!: string;
  @Prop({ required: true }) pricePerNight!: number;
  @Prop({ required: true }) stayTitle!: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

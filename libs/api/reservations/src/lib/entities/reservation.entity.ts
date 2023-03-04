import { Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { ReservationEntity as IReservationEntity } from '@booking-app/shared/dtos';
import { ReservationDocument } from '../schemas/reservation.schema';

const idToString = ({ obj }: { obj: { _id: Types.ObjectId } }) =>
  obj._id.toString();

export class ReservationEntity implements IReservationEntity {
  @Expose() @Transform(idToString) id!: string;
  @Expose() stayId!: string;
  @Expose() guestId!: string;
  @Expose() from!: string;
  @Expose() to!: string;
  @Expose() pricePerNight!: number;
  @Expose() stayTitle!: string;

  constructor(reservationDocument: ReservationDocument) {
    Object.assign(this, reservationDocument.toJSON());
  }
}

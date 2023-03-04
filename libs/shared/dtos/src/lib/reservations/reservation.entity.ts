export interface ReservationEntity {
  id: string;
  stayId: string;
  guestId: string;
  from: string;
  to: string;
  pricePerNight: number;
  stayTitle: string;
}

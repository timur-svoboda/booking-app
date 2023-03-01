export interface StayDto {
  id: string;
  hostId: string;
  title: string;
  description: string;
  images: {
    url: string;
    description: string;
  }[];
  pricePerNight: number;
  minimumLengthOfStay: number;
  reservationPeriod: number;
}

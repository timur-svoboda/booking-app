export interface StayDto {
  id: string;
  hostId: string;
  title: string;
  description: string;
  images: {
    mainUrl: string;
    thumbnailUrl: string;
    description: string;
  }[];
  pricePerNight: number;
  minimumLengthOfStay: number;
  reservationPeriod: number;
}

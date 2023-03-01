export interface StayFormData {
  title: string;
  description: string;
  images: {
    mainUrl: string;
    thumbnailUrl: string;
    description: string;
  }[];
  pricePerNight: string;
  minimumLengthOfStay: string;
  reservationPeriod: string;
}

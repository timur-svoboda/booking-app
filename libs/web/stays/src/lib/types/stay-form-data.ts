export interface StayFormData {
  title: string;
  description: string;
  images: {
    url: string;
    description: string;
  }[];
  pricePerNight: string;
  minimumLengthOfStay: string;
  reservationPeriod: string;
}

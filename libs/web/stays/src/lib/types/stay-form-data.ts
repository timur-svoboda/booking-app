export class StayFormData {
  title: string = '';
  description: string = '';
  images: {
    thumbnail: string;
    mainImage: string;
    description: string;
  }[] = [];
}

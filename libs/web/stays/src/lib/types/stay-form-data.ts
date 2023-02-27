export class StayFormData {
  title: string = '';
  description: string = '';
  images: {
    thumbnailUrl: string;
    file: File;
    description: string;
  }[] = [];
}

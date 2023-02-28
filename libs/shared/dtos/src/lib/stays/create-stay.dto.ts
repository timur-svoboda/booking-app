export interface CreateStayDto {
  title: string;
  description: string;
  images: {
    url: string;
    description: string;
  }[];
}

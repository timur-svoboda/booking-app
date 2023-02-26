import axios from 'axios';
import { CreateStayDto, StayDto, ThumbnailDto } from '@booking-app/shared/dtos';

export class StayApi {
  static create(createStayDto: CreateStayDto, accessToken: string) {
    return axios.post<StayDto>('/api/stays', createStayDto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static createThumbnail(file: FormData, accessToken: string) {
    return axios.post<ThumbnailDto>('/api/stays/thumbnails', file, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default StayApi;

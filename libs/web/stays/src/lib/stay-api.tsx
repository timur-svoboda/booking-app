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

  static createThumbnail(file: File, accessToken: string) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post<ThumbnailDto>('/api/stays/thumbnails', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default StayApi;

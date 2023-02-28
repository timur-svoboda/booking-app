import axios from 'axios';
import {
  CreateStayDto,
  StayDto,
  StayImagesUrlsDto,
} from '@booking-app/shared/dtos';

export class StayApi {
  static create(createStayDto: CreateStayDto, accessToken: string) {
    return axios.post<StayDto>('/api/stays', createStayDto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static createImage(file: File, accessToken: string) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post<StayImagesUrlsDto>('/api/stays/images', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default StayApi;

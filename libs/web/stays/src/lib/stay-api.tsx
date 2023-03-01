import axios from 'axios';
import {
  CreateStayDto,
  GetManyDto,
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

  static getOne(id: string) {
    return axios.get<StayDto>(`/api/stays/${id}`);
  }

  static getMany(getManyDto?: GetManyDto) {
    return axios.get<StayDto[]>('/api/stays', { params: getManyDto });
  }

  static update(id: string, updateStayDto: CreateStayDto, accessToken: string) {
    return axios.patch<StayDto>(`/api/stays/${id}`, updateStayDto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static delete(stayId: string, accessToken: string) {
    return axios.delete<StayDto>(`/api/stays/${stayId}`, {
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

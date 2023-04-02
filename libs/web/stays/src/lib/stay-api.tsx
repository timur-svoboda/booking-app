import axios from 'axios';
import {
  CreateStayDto,
  GetManyDto,
  StayDto,
  StayImagesUrlsDto,
} from '@booking-app/shared/dtos';

export class StayApi {
  private static baseUrl: string = process.env.NX_API_URL || '';

  static create(createStayDto: CreateStayDto, accessToken: string) {
    return axios.post<StayDto>(`${StayApi.baseUrl}/api/stays`, createStayDto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static getOne(id: string) {
    return axios.get<StayDto>(`${StayApi.baseUrl}/api/stays/${id}`);
  }

  static getMany(getManyDto?: GetManyDto) {
    return axios.get<StayDto[]>(`${StayApi.baseUrl}/api/stays`, {
      params: getManyDto,
    });
  }

  static update(id: string, updateStayDto: CreateStayDto, accessToken: string) {
    return axios.patch<StayDto>(
      `${StayApi.baseUrl}/api/stays/${id}`,
      updateStayDto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  static delete(stayId: string, accessToken: string) {
    return axios.delete<StayDto>(`${StayApi.baseUrl}/api/stays/${stayId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  static createImage(file: File, accessToken: string) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post<StayImagesUrlsDto>(`${StayApi.baseUrl}/api/stays/images`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default StayApi;

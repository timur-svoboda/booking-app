import axios from 'axios';
import { CreateStayDto, StayDto } from '@booking-app/api/stays';

export class StayApi {
  static create(createStayDto: CreateStayDto, accessToken: string) {
    return axios.post<StayDto>('/api/stays', createStayDto, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export default StayApi;

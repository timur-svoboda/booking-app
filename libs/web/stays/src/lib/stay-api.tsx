import axios from 'axios';
import { CreateStayDto, StayDto } from '@booking-app/api/stays';

export class StayApi {
  static create(createStayDto: CreateStayDto) {
    return axios.post<StayDto>('/api/stays', createStayDto);
  }
}

export default StayApi;

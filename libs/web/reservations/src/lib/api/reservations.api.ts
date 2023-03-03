import {
  CreateReservationDto,
  GetManyReservationsDto,
  ReservationEntity,
} from '@booking-app/shared/dtos';
import axios from 'axios';

export class ReservationsApi {
  static create(
    createReservationDto: CreateReservationDto,
    accessToken: string
  ) {
    return axios.post<ReservationEntity>(
      '/api/reservations',
      createReservationDto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  static getMany(getManyReservationsDto: GetManyReservationsDto) {
    return axios.get<ReservationEntity[]>('/api/reservations', {
      params: getManyReservationsDto,
    });
  }
}

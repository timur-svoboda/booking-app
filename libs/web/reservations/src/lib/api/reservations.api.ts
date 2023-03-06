import {
  CreateReservationDto,
  GetManyReservationsDto,
  ReservationEntity,
} from '@booking-app/shared/dtos';
import axios from 'axios';



export class ReservationsApi {
  private static baseUrl: string = process.env.NX_API_URL || '';

  static create(
    createReservationDto: CreateReservationDto,
    accessToken: string
  ) {
    return axios.post<ReservationEntity>(
      `${ReservationsApi.baseUrl}/api/reservations`,
      createReservationDto,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  static getMany(getManyReservationsDto: GetManyReservationsDto) {
    return axios.get<ReservationEntity[]>(
      `${ReservationsApi.baseUrl}/api/reservations`,
      {
        params: getManyReservationsDto,
      }
    );
  }

  static delete(reservationId: string, accessToken: string) {
    return axios.delete<ReservationEntity>(
      `${ReservationsApi.baseUrl}/api/reservations/${reservationId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
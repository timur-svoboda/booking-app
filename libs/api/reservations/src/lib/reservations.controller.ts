import {
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  UserId,
} from '@booking-app/api/auth';
import { ObjectIdValidationPipe } from '@booking-app/api/validation';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetManyReservationsDto } from './dto/get-many-reservations.dto';
import { ReservationEntity } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('create:reservations')
  @Post()
  async create(
    @UserId() userId: string,
    @Body() createReservationDto: CreateReservationDto
  ): Promise<ReservationEntity> {
    const reservationDocument = await this.reservationsService.create(
      userId,
      createReservationDto
    );
    return new ReservationEntity(reservationDocument);
  }

  @Get()
  async getMany(
    @Query() getManyReservationsDto: GetManyReservationsDto
  ): Promise<ReservationEntity[]> {
    const reservationsDocuments = await this.reservationsService.getMany(
      getManyReservationsDto
    );
    return reservationsDocuments.map(
      (reservationDocument) => new ReservationEntity(reservationDocument)
    );
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('delete:reservations')
  @Delete(':reservationId')
  async delete(
    @Param('reservationId', ObjectIdValidationPipe) reservationId: string,
    @UserId() userId: string
  ) {
    const reservationDocument = await this.reservationsService.delete(
      reservationId,
      userId
    );
    return new ReservationEntity(reservationDocument);
  }
}

import { StaysService } from '@booking-app/api/stays';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  differenceInDays,
  addMonths,
  isAfter,
  isBefore,
  startOfDay,
  isEqual,
} from 'date-fns';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetManyReservationsDto } from './dto/get-many-reservations.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private ReservationModel: Model<ReservationDocument>,
    private stayService: StaysService
  ) {}

  async create(userId: string, createReservationDto: CreateReservationDto) {
    // Get the document of a stay a user is going to reserve
    if (!(await this.stayService.exists(createReservationDto.stayId))) {
      throw new BadRequestException(
        `The stay with ID ${createReservationDto.stayId} does not exist`
      );
    }
    const stayDocument = await this.stayService.getOne(
      createReservationDto.stayId
    );

    // Define date variables used in the following code blocks
    const fromDate = startOfDay(new Date(createReservationDto.from));
    const toDate = startOfDay(new Date(createReservationDto.to));
    const today = startOfDay(new Date());

    // Check that fromDate is not before today
    if (!isAfter(fromDate, today) && !isEqual(fromDate, today)) {
      throw new BadRequestException(
        `The date of arrival must be after today or be today`
      );
    }

    // Check that formDate is before toDate
    if (!isBefore(fromDate, toDate)) {
      throw new BadRequestException(
        `The date of arrival must be before the date of departure`
      );
    }

    // Check a conflict with the reservation period
    const reservationDeadlineDate = addMonths(
      today,
      stayDocument.reservationPeriod
    );
    if (
      !isBefore(toDate, reservationDeadlineDate) &&
      !isEqual(toDate, reservationDeadlineDate)
    ) {
      throw new BadRequestException(
        `The date of departure must be before the last day of the reservation period or be the last day of the reservation period`
      );
    }

    // Check conflicts with other reservations
    const otherReservations = await this.ReservationModel.find({
      stayId: createReservationDto.stayId,
    });
    otherReservations.forEach((anotherReservation) => {
      const anotherReservationFromDate = startOfDay(
        new Date(anotherReservation.from)
      );
      const anotherReservationToDate = startOfDay(
        new Date(anotherReservation.to)
      );
      if (
        !isBefore(toDate, anotherReservationFromDate) &&
        !isAfter(fromDate, anotherReservationToDate)
      ) {
        throw new BadRequestException(
          `This reservation overlaps with another reservation`
        );
      }
    });

    // Check a conflict with the minimum length of stay
    if (differenceInDays(toDate, fromDate) < stayDocument.minimumLengthOfStay) {
      throw new BadRequestException(
        `The length of stay must be greater than or equal to ${stayDocument.minimumLengthOfStay} day(s)`
      );
    }

    // Add reservation data in the database
    return this.ReservationModel.create({
      guestId: userId,
      pricePerNight: stayDocument.pricePerNight,
      stayTitle: stayDocument.title,
      ...createReservationDto,
    });
  }

  getMany(getManyReservationsDto: GetManyReservationsDto) {
    return this.ReservationModel.find(getManyReservationsDto);
  }

  async delete(reservationId: string, userId: string) {
    const reservationDocument = await this.ReservationModel.findById(
      reservationId
    );
    if (reservationDocument === null) {
      throw new BadRequestException();
    }
    if (reservationDocument.guestId !== userId) {
      throw new UnauthorizedException();
    }
    return reservationDocument.remove();
  }
}

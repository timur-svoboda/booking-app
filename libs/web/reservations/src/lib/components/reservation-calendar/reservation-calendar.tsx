import { CreateReservationDto, StayDto } from '@booking-app/shared/dtos';
import {
  startOfDay,
  addMonths,
  isWithinInterval,
  isEqual,
  differenceInDays,
} from 'date-fns';
import React from 'react';
import ReactCalendar, {
  CalendarProps,
  OnChangeDateRangeCallback,
} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { Button, VStack, Text, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ReservationsApi } from '../../api/reservations.api';
import styles from './reservation-calendar.module.scss';
import {
  hasData,
  hasResponse,
  isBadRequest,
} from '@booking-app/web/validation';

/* eslint-disable-next-line */
export interface ReservationCalendarProps {
  stayId: StayDto['id'];
  reservationPeriod: StayDto['reservationPeriod'];
  minimumLengthOfStay: StayDto['minimumLengthOfStay'];
  pricePerNight: StayDto['pricePerNight'];
}

type Range = [Date, Date];

type TitleDisabled = Required<CalendarProps>['tileDisabled'];

export function ReservationCalendar(props: ReservationCalendarProps) {
  // Get minimum and maximum dates
  const minDate = startOfDay(new Date());
  const maxDate = addMonths(minDate, props.reservationPeriod);

  // Fetch other reservations ranges
  const [otherReservationsRanges, setOtherReservationsRanges] = React.useState<
    Range[]
  >([]);

  const fetchOtherReservationsRanges = React.useCallback(async () => {
    try {
      const { data: otherReservations } = await ReservationsApi.getMany({
        stayId: props.stayId,
      });
      const otherReservationsRanges = otherReservations.map(
        (anotherReservation): Range => {
          const start = startOfDay(new Date(anotherReservation.from));
          const end = startOfDay(new Date(anotherReservation.to));
          return [start, end];
        }
      );
      setOtherReservationsRanges(otherReservationsRanges);
    } catch {
      toast.error('Unknown error. Try to reload the page');
    }
  }, [props.stayId, setOtherReservationsRanges]);

  React.useEffect(() => {
    fetchOtherReservationsRanges();
  }, []);

  React.useEffect(() => {
    fetchOtherReservationsRanges;
  }, [fetchOtherReservationsRanges]);

  // Disable reserved dates
  const tileDisabled = React.useCallback<TitleDisabled>(
    (tileProps) => {
      return otherReservationsRanges.some((anotherReservationRange) => {
        const [start, end] = anotherReservationRange;
        return isWithinInterval(tileProps.date, { start, end });
      });
    },
    [otherReservationsRanges]
  );

  // Make calendar controlled
  const [reservationRange, setReservationRange] = React.useState<Range | null>(
    null
  );

  const onChange: OnChangeDateRangeCallback = (range) => {
    if (range.length === 2) {
      const start = startOfDay(range[0]);
      const end = startOfDay(range[1]);
      if (isEqual(start, end)) {
        setReservationRange(null);
      } else {
        setReservationRange([start, end]);
      }
    } else {
      setReservationRange(null);
    }
  };

  // Get number of nights
  const numberOfNights = React.useMemo(() => {
    if (reservationRange !== null) {
      const [start, end] = reservationRange;
      return differenceInDays(end, start);
    } else {
      return null;
    }
  }, [reservationRange]);

  // Reserve handler
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const onReserve = React.useCallback(async () => {
    if (reservationRange !== null) {
      try {
        const [fromDate, toDate] = reservationRange;
        const createReservationDto: CreateReservationDto = {
          stayId: props.stayId,
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        };
        const accessToken = await getAccessTokenSilently();
        await ReservationsApi.create(createReservationDto, accessToken);
        toast.success('Reservation is created');
        navigate('/');
      } catch (error: unknown) {
        if (
          hasResponse(error) &&
          hasData(error.response) &&
          isBadRequest(error.response.data)
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Unknown error. Try again');
        }
      }
    }
  }, [reservationRange]);

  // Hide component if a user is not authenticated
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return null;
  }

  return (
    <VStack spacing={4} alignItems="stretch">
      <ReactCalendar
        className={styles['calendar']}
        minDate={minDate}
        maxDate={maxDate}
        tileDisabled={tileDisabled}
        selectRange={true}
        allowPartialRange={true}
        value={reservationRange}
        onChange={onChange}
        locale="en"
      />
      {numberOfNights !== null && (
        <Flex justifyContent="space-between">
          <Text>
            ${props.pricePerNight} per night x {numberOfNights} nights
          </Text>
          <Text fontWeight="bold">${numberOfNights * props.pricePerNight}</Text>
        </Flex>
      )}
      <Button
        isDisabled={reservationRange === null}
        onClick={onReserve}
        colorScheme="teal"
      >
        Reserve
      </Button>
    </VStack>
  );
}

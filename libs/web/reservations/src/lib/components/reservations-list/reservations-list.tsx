import { useAuth0 } from '@auth0/auth0-react';
import { ReservationEntity } from '@booking-app/shared/dtos';
import { Center, VStack, Text, propNames } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { ReservationsApi } from '../../api/reservations.api';
import { ReservationItem } from './reservation-item';

/* eslint-disable-next-line */
export interface ReservationsListProps {
  reservations: ReservationEntity[];
  loading: boolean;
  error: boolean;
  own?: boolean;
  onCancel?: (reservationId: string) => void;
}

const Message = ({ children }: { children: string }) => {
  return (
    <Center>
      <Text fontSize="3xl" fontWeight="bold" color="gray.500">
        {children}
      </Text>
    </Center>
  );
};

export function ReservationsList(props: ReservationsListProps) {
  // Cancel reservation logic
  const { getAccessTokenSilently } = useAuth0();
  const onCancel = async (reservationId: string) => {
    try {
      const accessToken = await getAccessTokenSilently();
      await ReservationsApi.delete(reservationId, accessToken);
      if (props.onCancel) {
        props.onCancel(reservationId);
      }
      toast.success('Reservation is canceled');
    } catch {
      toast.error('Unknown error. Try again');
    }
  };

  if (props.loading) {
    return <Message>Loading...</Message>;
  }

  if (props.error) {
    return <Message>Unknown Error</Message>;
  }

  if (props.reservations.length === 0) {
    return <Message>Nothing Found</Message>;
  }

  return (
    <VStack alignItems="stretch" spacing="16px">
      {props.reservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          reservation={reservation}
          own={props.own}
          onCancel={onCancel}
        />
      ))}
    </VStack>
  );
}

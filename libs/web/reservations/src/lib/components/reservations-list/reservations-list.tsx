import { ReservationEntity } from '@booking-app/shared/dtos';
import { Center, VStack, Text } from '@chakra-ui/react';
import { ReservationItem } from './reservation-item';

/* eslint-disable-next-line */
export interface ReservationsListProps {
  reservations: ReservationEntity[];
  loading: boolean;
  error: boolean;
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

export function ReservationsList({
  reservations,
  loading,
  error,
}: ReservationsListProps) {
  if (loading) {
    return <Message>Loading...</Message>;
  }

  if (error) {
    return <Message>Unknown Error</Message>;
  }

  if (reservations.length === 0) {
    return <Message>Nothing Found</Message>;
  }

  return (
    <VStack alignItems="stretch" spacing="16px">
      {reservations.map((reservation) => (
        <ReservationItem key={reservation.id} reservation={reservation} />
      ))}
    </VStack>
  );
}

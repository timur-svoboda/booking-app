import { useAuth0 } from '@auth0/auth0-react';
import { ReservationEntity } from '@booking-app/shared/dtos';
import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { toast } from 'react-toastify';
import { ReservationsApi } from '../api/reservations.api';
import { ReservationsList } from '../components/reservations-list/reservations-list';

/* eslint-disable-next-line */
export interface GuestReservationsListPageProps {}

export function GuestReservationsListPage(
  props: GuestReservationsListPageProps
) {
  // Fetch reservations
  const [reservations, setReservations] = React.useState<ReservationEntity[]>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const { user } = useAuth0();

  const fetchReservations = React.useCallback(async () => {
    if (user) {
      try {
        setLoading(true);
        const { data: reservations } = await ReservationsApi.getMany({
          guestId: user.sub,
        });
        setReservations(reservations);
      } catch {
        toast.error('Unknown error. Try to reload the page');
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [user, setReservations]);

  React.useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Box pt={8} pb={8}>
      <Container maxWidth="container.lg">
        <ReservationsList
          reservations={reservations}
          loading={loading}
          error={error}
        />
      </Container>
    </Box>
  );
}

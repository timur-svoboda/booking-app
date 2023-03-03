import { StayDto } from '@booking-app/shared/dtos';
import { Box, Center, Container, Heading, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StayApi from '../stay-api';
import StayDetails from '../stay-details/stay-details';

/* eslint-disable-next-line */
export interface StaySinglePageProps {}

export function StaySinglePage(props: StaySinglePageProps) {
  const { stayId } = useParams();
  const [stay, setStay] = React.useState<StayDto | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchStay = React.useCallback(async () => {
    if (stayId) {
      try {
        setLoading(true);
        const { data: stay } = await StayApi.getOne(stayId);
        setStay(stay);
      } catch (error: unknown) {
        toast.error('Unknown error. Try to reload the page');
      } finally {
        setLoading(false);
      }
    }
  }, [stayId, setLoading, setStay]);

  React.useEffect(() => {
    fetchStay();
  }, [fetchStay]);

  if (loading) {
    return (
      <Box pt={8} pb={8}>
        <Center>
          <Spinner />
        </Center>
      </Box>
    );
  }

  if (stay === null) {
    return (
      <Box pt={8} pb={8}>
        <Center>
          <Heading color="gray.500">Nothing Found</Heading>
        </Center>
      </Box>
    );
  }

  return (
    <Box pt={8} pb={8}>
      <Container maxWidth="container.xl">
        <StayDetails stay={stay} />
      </Container>
    </Box>
  );
}

export default StaySinglePage;

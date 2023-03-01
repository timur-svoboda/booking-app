import { Box, Container, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { StayForm } from '../stay-form/stay-form';
import { StayApi } from '../stay-api';
import { StayFormData } from '../types/stay-form-data';
import { toast } from 'react-toastify';
import { formatPrice } from '../stay-form/price-field';
import { formatStayLength } from '../stay-form/min-stay-length-field';
import { formatReservationPeriod } from '../stay-form/reservation-period-field';

/* eslint-disable-next-line */
export interface EditStayPageProps {}

export function EditStayPage(props: EditStayPageProps) {
  const [stayFormData, setStayFormData] = React.useState<
    (StayFormData & { id: string }) | null
  >(null);
  const { id } = useParams();
  const getStayFormData = React.useCallback(async () => {
    if (id) {
      try {
        const { data: stay } = await StayApi.getOne(id);
        setStayFormData({
          ...stay,
          pricePerNight: formatPrice(stay.pricePerNight.toString()),
          minimumLengthOfStay: formatStayLength(
            stay.minimumLengthOfStay.toString()
          ),
          reservationPeriod: formatReservationPeriod(
            stay.reservationPeriod.toString()
          ),
        });
      } catch (error) {
        toast.error('Unknown error. Try to reload the page');
      }
    }
  }, [id]);
  React.useEffect(() => {
    getStayFormData();
  }, [getStayFormData]);

  return (
    <Box pt={8} pb={8}>
      <Container maxW="600px">
        {stayFormData === null ? (
          <Flex justifyContent="center">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <StayForm stay={stayFormData} />
        )}
      </Container>
    </Box>
  );
}

export default EditStayPage;

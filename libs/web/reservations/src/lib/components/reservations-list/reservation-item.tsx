import { ReservationEntity } from '@booking-app/shared/dtos';
import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Stack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { differenceInDays, format } from 'date-fns';

/* eslint-disable-next-line */
export interface ReservationItemProps {
  reservation: ReservationEntity;
}

const ItemColumn = ({ title, value }: { title: string; value: string }) => {
  return (
    <GridItem>
      <VStack
        width={{ base: '100%', sm: '50%', md: '100%' }}
        alignItems="flex-start"
      >
        <Text fontWeight="medium" color="gray.500">
          {title}
        </Text>
        <Text>{value}</Text>
      </VStack>
    </GridItem>
  );
};

export function ReservationItem({ reservation }: ReservationItemProps) {
  const fromDate = new Date(reservation.from);
  const toDate = new Date(reservation.to);

  const dateFormat = 'MM/dd/yyyy';
  const fromDateString = format(fromDate, dateFormat);
  const toDateString = format(toDate, dateFormat);

  const numberOfNights = differenceInDays(toDate, fromDate);
  const totalPrice = numberOfNights * reservation.pricePerNight;
  const totalPriceString = `$${totalPrice}`;

  return (
    <Flex
      padding="8px 12px"
      borderRadius="md"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
    >
      <Grid
        templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }}
        templateRows={{ base: 'repeat(4, 1fr)', sm: '1fr 1fr', md: '1fr' }}
        gap="32px"
      >
        <ItemColumn title="Stay Title" value={reservation.stayTitle} />
        <ItemColumn title="Arrival Date" value={fromDateString} />
        <ItemColumn title="Departure Date" value={toDateString} />
        <ItemColumn title="Total Price" value={totalPriceString} />
      </Grid>
    </Flex>
  );
}

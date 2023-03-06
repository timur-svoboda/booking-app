import { ReservationEntity } from '@booking-app/shared/dtos';
import { Flex, VStack, Text, Grid, GridItem, Button } from '@chakra-ui/react';
import { differenceInDays, format } from 'date-fns';
import React from 'react';

/* eslint-disable-next-line */
export interface ReservationItemProps {
  reservation: ReservationEntity;
  own?: boolean;
  onCancel: (reservationId: string) => Promise<void>;
}

const ItemColumn = ({ title, value }: { title: string; value: string }) => {
  return (
    <GridItem>
      <VStack alignItems="flex-start">
        <Text fontWeight="medium" color="gray.500">
          {title}
        </Text>
        <Text>{value}</Text>
      </VStack>
    </GridItem>
  );
};

export function ReservationItem(props: ReservationItemProps) {
  // Prepare reservation data
  const fromDate = new Date(props.reservation.from);
  const toDate = new Date(props.reservation.to);

  const dateFormat = 'MM/dd/yyyy';
  const fromDateString = format(fromDate, dateFormat);
  const toDateString = format(toDate, dateFormat);

  const numberOfNights = differenceInDays(toDate, fromDate);
  const totalPrice = numberOfNights * props.reservation.pricePerNight;
  const totalPriceString = `$${totalPrice}`;

  // Loading logic for canceling
  const [loading, setLoading] = React.useState(false);
  const onCancel = async () => {
    setLoading(true);
    await props.onCancel(props.reservation.id);
    setLoading(false);
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap="32px"
      justifyContent="space-between"
      alignItems={{ base: 'stretch', md: 'center' }}
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
        <ItemColumn title="Stay Title" value={props.reservation.stayTitle} />
        <ItemColumn title="Arrival Date" value={fromDateString} />
        <ItemColumn title="Departure Date" value={toDateString} />
        <ItemColumn title="Total Price" value={totalPriceString} />
      </Grid>
      {props.own && (
        <Button isDisabled={loading} onClick={onCancel} colorScheme="red">
          Cancel
        </Button>
      )}
    </Flex>
  );
}

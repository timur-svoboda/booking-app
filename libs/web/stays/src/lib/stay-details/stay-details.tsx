import { StayDto } from '@booking-app/shared/dtos';
import { Heading, VStack, Text, Box, Stack, Flex } from '@chakra-ui/react';
import { ReservationCalendar } from '@booking-app/web/reservations';
import { ImageGallery } from './image-gallery';

/* eslint-disable-next-line */
export interface StayDetailsProps {
  stay: StayDto;
}

export function StayDetails(props: StayDetailsProps) {
  return (
    <Stack direction={{ base: 'column', lg: 'row' }} spacing="32px">
      <VStack
        width={{ base: '100%', lg: 'calc(100% - 350px - 32px)' }}
        spacing="32px"
        alignItems="stretch"
      >
        <Heading as="h1">{props.stay.title}</Heading>
        <VStack spacing="16px" alignItems="stretch">
          <Heading as="h2" size="md">
            Images
          </Heading>
          <ImageGallery images={props.stay.images} />
        </VStack>
        <VStack spacing="8px" alignItems="stretch">
          <Heading as="h2" size="md">
            Description
          </Heading>
          <Text>{props.stay.description}</Text>
        </VStack>
      </VStack>
      <Box position="relative" flex={{ lg: '0 0 350px' }}>
        <Box position="sticky" top="32px">
          <ReservationCalendar
            stayId={props.stay.id}
            minimumLengthOfStay={props.stay.minimumLengthOfStay}
            reservationPeriod={props.stay.reservationPeriod}
            pricePerNight={props.stay.pricePerNight}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default StayDetails;

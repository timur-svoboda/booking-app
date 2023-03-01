import { StayDto } from '@booking-app/shared/dtos';
import { Heading, VStack, Text } from '@chakra-ui/react';
import ImageGallery from './image-gallery';

/* eslint-disable-next-line */
export interface StayDetailsProps {
  stay: StayDto;
}

export function StayDetails(props: StayDetailsProps) {
  return (
    <VStack spacing={8} alignItems="stretch">
      <Heading as="h1">{props.stay.title}</Heading>
      <VStack spacing={4} alignItems="stretch">
        <Heading as="h2" size="md">
          Images
        </Heading>
        <ImageGallery images={props.stay.images} />
      </VStack>
      <VStack spacing={2} alignItems="stretch">
        <Heading as="h2" size="md">
          Description
        </Heading>
        <Text>{props.stay.description}</Text>
      </VStack>
    </VStack>
  );
}

export default StayDetails;

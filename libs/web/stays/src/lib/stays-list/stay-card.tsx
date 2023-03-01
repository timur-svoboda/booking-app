import { StayDto } from '@booking-app/shared/dtos';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface StayCardProps {
  stay: StayDto;
}

export function StayCard(props: StayCardProps) {
  const [imageLoading, setImageLoading] = React.useState<boolean>(true);

  return (
    <Card size={{ base: 'sm', sm: 'md' }}>
      <CardBody>
        <Box position="relative">
          <Link to={`stays/${props.stay.id}`}>
            <Image
              src={props.stay.images[0].mainUrl}
              alt={props.stay.images[0].description}
              width="100%"
              height="300px"
              objectFit="cover"
              borderRadius="lg"
              onLoad={() => setImageLoading(false)}
            />
          </Link>
          {imageLoading && (
            <Skeleton
              position="absolute"
              left="0"
              top="0"
              width="100%"
              height="300px"
              borderRadius="lg"
            />
          )}
        </Box>
        <Stack mt="6" spacing="3">
          <Heading size="md">{props.stay.title}</Heading>
          <Text noOfLines={3}>{props.stay.description}</Text>
          <Text color="teal" fontSize="2xl">
            ${props.stay.pricePerNight} per night
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Link to={`stays/${props.stay.id}`}>
          <Button colorScheme="teal">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default StayCard;

import {
  Box,
  Image,
  Input,
  Button,
  Flex,
  useToken,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';
import { Thumbnail as IThumbnail } from './types';

/* eslint-disable-next-line */
export interface ThumbnailProps {
  thumbnail: IThumbnail;
}

export function Thumbnail(props: ThumbnailProps) {
  const [loading, setLoading] = React.useState<boolean>(true);

  const [gray200] = useToken('colors', ['gray.200']);

  return (
    <Flex
      alignItems="center"
      pr={4}
      border={`1px solid ${gray200}`}
      borderRadius="md"
      overflow="hidden"
    >
      <Box position="relative" flex="none" mr={4}>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={props.thumbnail.url}
          alt=""
          opacity={loading ? 0 : 1}
          onLoad={() => setLoading(false)}
        />
        {loading && (
          <Skeleton
            position="absolute"
            left="0"
            top="0"
            width="100px"
            height="100px"
          />
        )}
      </Box>

      <Input mr={4} placeholder="Description" />

      <Box flex="none">
        <Button type="button" colorScheme="red">
          Delete
        </Button>
      </Box>
    </Flex>
  );
}

export default Thumbnail;

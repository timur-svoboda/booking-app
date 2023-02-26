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

/* eslint-disable-next-line */
export interface Thumbnail {
  url: string;
}

export interface ThumbnailListProps {
  thumbnails: Thumbnail[];
}

export function ThumbnailList(props: ThumbnailListProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [gray200] = useToken('colors', ['gray.200']);

  if (props.thumbnails.length === 0) {
    return null;
  }

  return (
    <Box>
      {props.thumbnails.map((thumbnail) => (
        <Flex
          key={thumbnail.url}
          alignItems="center"
          pr={4}
          mb={4}
          border={`1px solid ${gray200}`}
          borderRadius="md"
          overflow="hidden"
        >
          <Box position="relative" flex="none" mr={4}>
            <Image
              boxSize="100px"
              objectFit="cover"
              src={thumbnail.url}
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
      ))}
    </Box>
  );
}

export default Thumbnail;

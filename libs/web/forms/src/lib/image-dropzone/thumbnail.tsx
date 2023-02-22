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
import { FileWithPreview } from './file-with-preview';

/* eslint-disable-next-line */
export interface ThumbnailProps {
  file: FileWithPreview;
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
          src={props.file.preview}
          alt=""
          opacity={loading ? 0 : 1}
          onLoad={() => {
            URL.revokeObjectURL(props.file.preview);
            setLoading(false);
          }}
          onError={() => {
            URL.revokeObjectURL(props.file.preview);
            setLoading(false);
          }}
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

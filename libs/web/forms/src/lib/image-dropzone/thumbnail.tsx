import { Box, Image, Input, Button, Flex, useToken } from '@chakra-ui/react';
import { FileWithPreview } from './file-with-preview';

/* eslint-disable-next-line */
export interface ThumbnailProps {
  file: FileWithPreview;
}

export function Thumbnail(props: ThumbnailProps) {
  const [gray200] = useToken('colors', ['gray.200']);

  return (
    <Flex
      alignItems="center"
      pr={4}
      border={`1px solid ${gray200}`}
      borderRadius="md"
      overflow="hidden"
    >
      <Box flex="none" mr={4}>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={props.file.preview}
          alt=""
          onLoad={() => {
            URL.revokeObjectURL(props.file.preview);
          }}
          onError={() => {
            URL.revokeObjectURL(props.file.preview);
          }}
        />
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

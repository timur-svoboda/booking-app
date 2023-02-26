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
import { ChangeHandler, InternalFieldName } from 'react-hook-form';

/* eslint-disable-next-line */
export interface ThumbnailProps<
  TFieldName extends InternalFieldName = InternalFieldName
> {
  url: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: TFieldName;
  required?: boolean;
  disabled?: boolean;
}

export const Thumbnail = React.forwardRef(
  <TFieldName extends InternalFieldName = InternalFieldName>(
    props: ThumbnailProps<TFieldName>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [gray200] = useToken('colors', ['gray.200']);

    return (
      <Flex
        key={props.url}
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
            src={props.url}
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

        <Input
          ref={ref}
          name={props.name}
          placeholder="Description"
          required={props.required}
          disabled={props.disabled}
          onChange={props.onChange}
          onBlur={props.onBlur}
          mr={4}
        />

        <Box flex="none">
          <Button type="button" colorScheme="red">
            Delete
          </Button>
        </Box>
      </Flex>
    );
  }
);

export default Thumbnail;

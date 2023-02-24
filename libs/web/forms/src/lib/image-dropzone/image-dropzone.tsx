import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useToken, Box, Center, Text } from '@chakra-ui/react';
import { Thumbnail as ThumbnailType } from './types';
import { Thumbnail } from './thumbnail';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

/* eslint-disable-next-line */
export interface ImageDropzoneProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any
> {
  name: TName;
  control: Control<TFieldValues, TContext>;
  required?: boolean;
  thumbnails?: ThumbnailType[];
}

export function ImageDropzone<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TContext = any
>(props: ImageDropzoneProps<TFieldValues, TName, TContext>) {
  /* Logic */
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: { required: props.required },
  });

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      onDrop: (acceptedFiles) => {
        if (Array.isArray(field.value)) {
          field.onChange([...field.value, ...acceptedFiles]);
        } else {
          field.onChange(acceptedFiles);
        }
      },
    });

  /* Styles */
  const [red500, blue500] = useToken('colors', ['red.500', 'blue.500']);

  const borderColor = React.useMemo(() => {
    if (isDragReject) return red500;
    if (isDragAccept || isFocused) return blue500;
    return 'gray.200';
  }, [isFocused, isDragAccept, isDragReject]);

  const boxShadow = React.useMemo(() => {
    if (isDragReject) return `0 0 0 1px ${red500}`;
    if (isDragAccept || isFocused) return `0 0 0 1px ${blue500}`;
    return '';
  }, [isFocused, isDragAccept, isDragReject]);

  /* Markup */
  return (
    <Box as="section">
      <Box
        {...getRootProps()}
        padding="8px 16px"
        height="20"
        borderWidth={1}
        borderStyle="solid"
        borderColor={borderColor}
        borderRadius="md"
        boxShadow={boxShadow}
        cursor="pointer"
        transition="all 0.2s ease"
      >
        <input
          {...getInputProps()}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />

        <Center height="100%">
          <Text color="gray.500" cursor="pointer">
            Drag 'n' drop some files here, or click to select files
          </Text>
        </Center>
      </Box>

      {props.thumbnails && props.thumbnails.length > 0 && (
        <Box as="aside" mt={4}>
          {props.thumbnails.map((thumbnail) => (
            <Box mb={4} key={thumbnail.url}>
              <Thumbnail thumbnail={thumbnail} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageDropzone;

import React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useToken, Box, Center, Text, Spinner } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface DropzoneProps extends DropzoneOptions {
  hintText?: string;
  isLoading?: boolean;
  isError?: boolean;
}

export function Dropzone({
  hintText,
  isLoading,
  isError,
  ...dropzoneOptions
}: DropzoneProps) {
  /* Logic */
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone(dropzoneOptions);

  /* Styles */
  const [red500, blue500] = useToken('colors', ['red.500', 'blue.500']);

  const borderColor = React.useMemo(() => {
    if (isDragReject || isError) return red500;
    if (isDragAccept) return blue500;
    return 'gray.200';
  }, [isFocused, isDragAccept, isDragReject]);

  const boxShadow = React.useMemo(() => {
    if (isDragReject || isError) return `0 0 0 1px ${red500}`;
    if (isDragAccept) return `0 0 0 1px ${blue500}`;
    return '';
  }, [isFocused, isDragAccept, isDragReject]);

  /* Markup */
  return (
    <Box
      {...getRootProps()}
      padding="8px 16px"
      height="20"
      borderWidth={1}
      borderStyle="solid"
      borderColor={borderColor}
      borderRadius="md"
      boxShadow={boxShadow}
      cursor={isLoading ? 'wait' : 'pointer'}
      transition="all 0.2s ease"
    >
      <input {...getInputProps()} />

      <Center height="100%">
        {isLoading ? (
          <Spinner cursor="wait" />
        ) : (
          <Text color="gray.500" cursor="pointer">
            {hintText ??
              "Drag 'n' drop some files here, or click to select files"}
          </Text>
        )}
      </Center>
    </Box>
  );
}

export default Dropzone;

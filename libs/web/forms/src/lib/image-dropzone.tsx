import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useToken, Box, Center, Text } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ImageDropzoneProps {}

export function ImageDropzone(props: ImageDropzoneProps) {
  const [files, setFiles] = React.useState<File[]>([]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': [] },
      maxFiles: 10,
      onDrop: (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
      },
    });

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

  return (
    <Box as="section">
      <Box
        {...getRootProps()}
        pt={2}
        pr={4}
        pb={2}
        pl={4}
        height="20"
        borderWidth={1}
        borderStyle="solid"
        borderColor={borderColor}
        borderRadius="md"
        boxShadow={boxShadow}
        cursor="pointer"
        transition="all 0.2s ease"
      >
        <input {...getInputProps()} />
        <Center height="100%">
          <Text color="gray.500" cursor="pointer">
            Drag 'n' drop some files here, or click to select files
          </Text>
        </Center>
      </Box>
      <Box as="aside">
        {files.map((file) => (
          <p>{file.name}</p>
        ))}
      </Box>
    </Box>
  );
}

export default ImageDropzone;

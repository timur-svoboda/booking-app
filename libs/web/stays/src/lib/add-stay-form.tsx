import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  ImageDropzone,
  Thumbnail,
  ValidationErrors,
} from '@booking-app/web/forms';
import StayApi from './stay-api';
import { StayFormData } from './types/stay-form-data';
import { ThumbnailDto } from '@booking-app/shared/dtos';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

const IMAGES_DESCRIPTION_FIELD_NAME = 'imagesDescriptions';

export function AddStayForm(props: AddStayFormProps) {
  /* Main logic of the form */
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
    control,
  } = useForm<StayFormData>({
    reValidateMode: 'onSubmit',
  });
  const validationErrorsRef = React.useRef(
    new ValidationErrors(StayFormData, setError)
  );

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const accessToken = await getAccessTokenSilently();
    setLoading(true);
    clearErrors();

    try {
      await StayApi.create(data, accessToken);
      toast.success('Stay is created');
      navigate('/');
    } catch (errors: unknown) {
      if (validationErrorsRef.current.validateErrors(errors)) {
        validationErrorsRef.current.setErrors(errors);
      } else {
        toast.error('Unknown error. Try again');
      }
    }

    setLoading(false);
  });

  /* Images logic */
  const [thumbnails, setThumbnails] = React.useState<ThumbnailDto[]>([]);
  const [areThumbnailsLoading, setAreThumbnailsLoading] =
    React.useState<boolean>(false);
  const imagesDescriptions = useFieldArray({
    control,
    name: IMAGES_DESCRIPTION_FIELD_NAME,
  });

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      setAreThumbnailsLoading(true);

      const newThumbnails = await Promise.all(
        acceptedFiles.map(async (file) => {
          const fileData = new FormData();
          fileData.append('file', file);
          const accessToken = await getAccessTokenSilently();
          const { data: thumbnail } = await StayApi.createThumbnail(
            fileData,
            accessToken
          );
          return thumbnail;
        })
      );
      setThumbnails([...thumbnails, ...newThumbnails]);

      newThumbnails.forEach(() => {
        imagesDescriptions.append({ value: '' });
      });
    } catch (errors: unknown) {
      toast.error('Unknown error. Try again');
    } finally {
      setAreThumbnailsLoading(false);
    }
  };

  /* Markup */
  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading as="h1" size="lg" mb={6}>
        Add a Stay
      </Heading>

      <VStack spacing={4} mb={6}>
        <FormControl
          isInvalid={errors.title !== undefined}
          isDisabled={loading}
        >
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            placeholder="My Awesome Hotel"
            {...register('title')}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Images</FormLabel>
          <ImageDropzone
            name="images"
            control={control}
            onDrop={onDrop}
            isLoading={areThumbnailsLoading}
          />
          {thumbnails.length > 0 && (
            <VStack
              spacing={4}
              alignItems="stretch"
              mt={thumbnails.length ? 4 : 0}
            >
              {thumbnails.map((thumbnail, index) => (
                <Thumbnail
                  key={thumbnail.publicUrl}
                  url={thumbnail.publicUrl}
                  {...register(
                    `${IMAGES_DESCRIPTION_FIELD_NAME}.${index}.value`
                  )}
                />
              ))}
            </VStack>
          )}
        </FormControl>

        <FormControl
          isInvalid={errors.description !== undefined}
          isDisabled={loading}
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description of My Awesome Hotel"
            resize="none"
            minRows={5}
            as={TextareaAutosize}
            {...register('description')}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
      </VStack>

      <Flex justifyContent="flex-end">
        <Button type="submit" colorScheme="teal" isLoading={loading}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
}

export default AddStayForm;

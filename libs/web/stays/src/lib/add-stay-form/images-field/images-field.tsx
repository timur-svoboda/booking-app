import React from 'react';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import {
  hasData,
  hasResponse,
  isBadRequest,
} from '@booking-app/web/validation';
import { Thumbnail } from './thumbnail';
import { Dropzone, DropzoneProps } from './dropzone';
import { StayFormData } from '../../types/stay-form-data';
import { StayApi } from '../../stay-api';

/* eslint-disable-next-line */
export interface ImagesFieldProps {}

export function ImagesField(props: ImagesFieldProps) {
  const [thumbnailUrls, setThumbnailUrls] = React.useState<string[]>([]);
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { register, control, formState } = useFormContext<StayFormData>();
  const { fields, append, remove } = useFieldArray({ name: 'images', control });

  const onDrop: DropzoneProps['onDrop'] = async (acceptedFiles) => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessTokenSilently();
      const imagesUrls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const response = await StayApi.createImage(file, accessToken);
          return response.data;
        })
      );
      imagesUrls.forEach((imageUrls) => {
        append({
          url: imageUrls.mainImage,
          description: '',
        });
      });
      setThumbnailUrls([
        ...thumbnailUrls,
        ...imagesUrls.map((imageUrls) => imageUrls.thumbnail),
      ]);
    } catch (error: unknown) {
      if (
        hasResponse(error) &&
        hasData(error.response) &&
        isBadRequest(error.response.data)
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Unknown error. Try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = (index: number) => {
    remove(index);
    setThumbnailUrls(thumbnailUrls.filter((_, i) => i !== index));
  };

  return (
    <>
      <FormControl isInvalid={formState.errors.images !== undefined}>
        <FormLabel>Images</FormLabel>
        <Dropzone
          isLoading={isLoading}
          disabled={isLoading}
          isError={formState.errors.images !== undefined}
          onDrop={onDrop}
        />
        <FormErrorMessage>{formState.errors.images?.message}</FormErrorMessage>
      </FormControl>
      {fields.length > 0 && (
        <VStack spacing={4} alignItems="stretch" mt={4} width="100%">
          {fields.map((field, index) => (
            <FormControl
              key={field.id}
              isInvalid={
                formState.errors.images &&
                formState.errors.images[index]?.description !== undefined
              }
            >
              <Thumbnail
                url={thumbnailUrls[index]}
                onRemove={() => onRemove(index)}
                {...register(`images.${index}.description`)}
              />
              <FormErrorMessage>
                {formState.errors.images &&
                  formState.errors.images[index]?.description?.message}
              </FormErrorMessage>
            </FormControl>
          ))}
        </VStack>
      )}
    </>
  );
}

export default ImagesField;

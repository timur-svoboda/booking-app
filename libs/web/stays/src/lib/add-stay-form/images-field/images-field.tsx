import React from 'react';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, VStack } from '@chakra-ui/react';
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
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { register, control } = useFormContext<StayFormData>();
  const { fields, append, remove } = useFieldArray({ name: 'images', control });

  const onDrop: DropzoneProps['onDrop'] = async (acceptedFiles) => {
    try {
      setIsLoading(true);

      const accessToken = await getAccessTokenSilently();
      const newThumbnails = await Promise.all(
        acceptedFiles.map(async (file) => ({
          thumbnailUrl: (
            await StayApi.createThumbnail(file, accessToken)
          ).data.publicUrl,
          file,
          description: '',
        }))
      );

      newThumbnails.forEach((thumbnail) => append(thumbnail));
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
  };

  return (
    <FormControl>
      <FormLabel>Images</FormLabel>

      <Dropzone isLoading={isLoading} disabled={isLoading} onDrop={onDrop} />

      {fields.length > 0 && (
        <VStack spacing={4} alignItems="stretch" mt={4}>
          {fields.map((field, index) => (
            <Thumbnail
              key={field.id}
              url={field.thumbnailUrl}
              onRemove={() => onRemove(index)}
              {...register(`images.${index}.description`)}
            />
          ))}
        </VStack>
      )}
    </FormControl>
  );
}

export default ImagesField;

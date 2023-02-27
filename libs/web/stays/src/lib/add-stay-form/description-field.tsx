import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { StayFormData } from '../types/stay-form-data';

/* eslint-disable-next-line */
export interface DescriptionFieldProps {}

export function DescriptionField(props: DescriptionFieldProps) {
  const { register, formState } = useFormContext<StayFormData>();

  return (
    <FormControl
      isInvalid={formState.errors.description !== undefined}
      isDisabled={formState.isSubmitting}
    >
      <FormLabel>Description</FormLabel>
      <Textarea
        placeholder="Description of My Awesome Hotel"
        resize="none"
        minRows={5}
        as={TextareaAutosize}
        {...register('description')}
      />
      <FormErrorMessage>
        {formState.errors.description?.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default DescriptionField;

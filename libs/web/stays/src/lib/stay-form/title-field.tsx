import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { StayFormData } from '../types/stay-form-data';

/* eslint-disable-next-line */
export interface TitleFieldProps {}

export function TitleField(props: TitleFieldProps) {
  const { register, formState } = useFormContext<StayFormData>();

  return (
    <FormControl
      isInvalid={formState.errors.title !== undefined}
      isDisabled={formState.isSubmitting}
    >
      <FormLabel>Title</FormLabel>
      <Input
        type="text"
        placeholder="My Awesome Hotel"
        {...register('title')}
      />
      <FormErrorMessage>{formState.errors.title?.message}</FormErrorMessage>
    </FormControl>
  );
}

export default TitleField;

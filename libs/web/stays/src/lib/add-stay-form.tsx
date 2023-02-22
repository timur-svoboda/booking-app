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
import { useForm } from 'react-hook-form';
import { setValidationErrors } from '@booking-app/web/forms';
import StayApi from './stay-api';
import { FormData } from './types/form-data';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

export function AddStayForm(props: AddStayFormProps) {
  const { getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: 'onSubmit',
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    const accessToken = await getAccessTokenSilently();
    setLoading(true);
    clearErrors();

    try {
      await StayApi.create(data, accessToken);
      toast.success('Stay is created');
      navigate('/');
    } catch (error: unknown) {
      if (!setValidationErrors(error, FormData, setError)) {
        toast.error('Unknown error. Try again');
      }
    }

    setLoading(false);
  });

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

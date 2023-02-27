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
import { FormProvider, useForm } from 'react-hook-form';
import { ValidationErrors } from '@booking-app/web/forms';
import StayApi from './stay-api';
import { StayFormData } from './types/stay-form-data';
import { ImagesDropzone } from './images-dropzone/images-dropzone';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

const IMAGES_DESCRIPTION_FIELD_NAME = 'imagesDescriptions';

export function AddStayForm(props: AddStayFormProps) {
  /* Main logic of the form */
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const methods = useForm<StayFormData>({
    reValidateMode: 'onSubmit',
  });
  const validationErrorsRef = React.useRef(
    new ValidationErrors(StayFormData, methods.setError)
  );

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
    const accessToken = await getAccessTokenSilently();
    setLoading(true);
    methods.clearErrors();

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

  /* Markup */
  return (
    <FormProvider {...methods}>
      <Box as="form" onSubmit={onSubmit}>
        <Heading as="h1" size="lg" mb={6}>
          Add a Stay
        </Heading>

        <VStack spacing={4} mb={6}>
          <FormControl
            isInvalid={methods.formState.errors.title !== undefined}
            isDisabled={loading}
          >
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="My Awesome Hotel"
              {...methods.register('title')}
            />
            <FormErrorMessage>
              {methods.formState.errors.title?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Images</FormLabel>
            <ImagesDropzone />
          </FormControl>

          <FormControl
            isInvalid={methods.formState.errors.description !== undefined}
            isDisabled={loading}
          >
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description of My Awesome Hotel"
              resize="none"
              minRows={5}
              as={TextareaAutosize}
              {...methods.register('description')}
            />
            <FormErrorMessage>
              {methods.formState.errors.description?.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>

        <Flex justifyContent="flex-end">
          <Button type="submit" colorScheme="teal" isLoading={loading}>
            Submit
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
}

export default AddStayForm;

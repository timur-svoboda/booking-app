import React from 'react';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { ValidationErrors } from '@booking-app/web/forms';
import StayApi from '../stay-api';
import { StayFormData } from '../types/stay-form-data';
import TitleField from './title-field';
import DescriptionField from './description-field';
import ImagesField from './images-field/images-field';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

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
          <TitleField />
          <ImagesField />
          <DescriptionField />
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

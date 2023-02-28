import React from 'react';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import StayApi from '../stay-api';
import { StayFormData } from '../types/stay-form-data';
import TitleField from './title-field';
import DescriptionField from './description-field';
import ImagesField from './images-field/images-field';
import {
  hasData,
  hasResponse,
  isBadRequestWithValidationErrors,
} from '@booking-app/web/validation';
import { classValidatorErrorsToFieldsErrors } from '@booking-app/web/forms';

/* eslint-disable-next-line */
export interface AddStayFormProps {}

export function AddStayForm(props: AddStayFormProps) {
  /* Main logic of the form */
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const methods = useForm<StayFormData>({ reValidateMode: 'onSubmit' });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const accessToken = await getAccessTokenSilently();
      await StayApi.create(data, accessToken);
      toast.success('Stay is created');
      navigate('/');
    } catch (errors: unknown) {
      if (
        hasResponse(errors) &&
        hasData(errors.response) &&
        isBadRequestWithValidationErrors(errors.response.data)
      ) {
        console.log(
          classValidatorErrorsToFieldsErrors(
            errors.response.data.validationErrors
          )
        );
        classValidatorErrorsToFieldsErrors<StayFormData>(
          errors.response.data.validationErrors
        ).forEach((fieldError) => {
          methods.setError(fieldError.fieldName, {
            message: fieldError.errorMessage,
          });
        });
      } else {
        toast.error('Unknown error. Try again');
      }
    }
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
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={methods.formState.isSubmitting}
            onClick={() => methods.clearErrors()}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </FormProvider>
  );
}

export default AddStayForm;

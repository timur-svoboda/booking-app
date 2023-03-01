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
import PriceField, { parsePrice } from './price-field';
import MinStayLengthField, { parseStayLength } from './min-stay-length-field';
import ReservationPeriodField, {
  parseReservationPeriod,
} from './reservation-period-field';

/* eslint-disable-next-line */
export interface StayFormProps {
  stay?: StayFormData & { id: string };
}

export function StayForm(props: StayFormProps) {
  /* Main logic of the form */
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const methods = useForm<StayFormData>({
    reValidateMode: 'onSubmit',
    defaultValues: props.stay || {
      pricePerNight: '$100',
      minimumLengthOfStay: '1 day',
      reservationPeriod: '3 months',
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const preparedData = {
        ...data,
        pricePerNight: +parsePrice(data.pricePerNight),
        minimumLengthOfStay: +parseStayLength(data.minimumLengthOfStay),
        reservationPeriod: +parseReservationPeriod(data.reservationPeriod),
      };
      if (props.stay) {
        await StayApi.update(props.stay.id, preparedData, accessToken);
        toast.success('Stay is updated');
      } else {
        await StayApi.create(preparedData, accessToken);
        toast.success('Stay is created');
      }
      navigate('/');
    } catch (errors: unknown) {
      if (
        hasResponse(errors) &&
        hasData(errors.response) &&
        isBadRequestWithValidationErrors(errors.response.data)
      ) {
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

  return (
    <FormProvider {...methods}>
      <Box as="form" onSubmit={onSubmit}>
        <Heading as="h1" size="lg" mb={6}>
          {props.stay ? 'Update a Stay' : 'Add a Stay'}
        </Heading>
        <VStack spacing={4} mb={6}>
          <TitleField />
          <ImagesField />
          <DescriptionField />
          <PriceField />
          <MinStayLengthField />
          <ReservationPeriodField />
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

export default StayForm;

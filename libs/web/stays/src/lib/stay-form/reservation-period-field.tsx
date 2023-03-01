import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StayFormData } from '../types/stay-form-data';

/* eslint-disable-next-line */
export interface ReservationPeriodFieldProps {}

export const formatReservationPeriod = (value: string) =>
  Number.parseInt(value) === 1 ? `${value} month` : `${value} months`;

export const parseReservationPeriod = (value: string) =>
  Number.parseInt(value).toString();

export function ReservationPeriodField(props: ReservationPeriodFieldProps) {
  const { register, formState } = useFormContext<StayFormData>();
  const registerProps = register('reservationPeriod');
  const [value, setValue] = React.useState<string>(
    parseReservationPeriod(formState.defaultValues?.reservationPeriod || '')
  );
  React.useEffect(() => {
    registerProps.onChange({ target: registerProps.ref });
  }, [value]);

  return (
    <>
      <FormControl
        isInvalid={formState.errors.reservationPeriod !== undefined}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel>Reservation period</FormLabel>
        <NumberInput
          ref={registerProps.ref}
          name={registerProps.name}
          pattern="[0-9]*(.[0-9]+)?\smonths?"
          value={formatReservationPeriod(value)}
          min={1}
          step={1}
          onChange={(value) => setValue(parseReservationPeriod(value))}
          onBlur={registerProps.onBlur}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText>
          Number of the following months when a customer can reserve your stay
        </FormHelperText>
        <FormErrorMessage>
          {formState.errors.reservationPeriod?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}

export default ReservationPeriodField;

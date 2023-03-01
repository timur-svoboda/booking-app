import {
  FormControl,
  FormErrorMessage,
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
export interface PriceFieldProps {}

export const formatPrice = (value: string) => `$${value}`;

export const parsePrice = (value: string) => value.replace(/^\$/, '');

export function PriceField(props: PriceFieldProps) {
  const { register, formState } = useFormContext<StayFormData>();
  const registerProps = register('pricePerNight');
  const [value, setValue] = React.useState<string>('100');
  React.useEffect(() => {
    registerProps.onChange({ target: registerProps.ref });
  }, [value]);

  return (
    <>
      <FormControl
        isInvalid={formState.errors.pricePerNight !== undefined}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel>Price per night</FormLabel>
        <NumberInput
          ref={registerProps.ref}
          name={registerProps.name}
          pattern="\$[0-9]*(.[0-9]+)?"
          value={formatPrice(value)}
          min={1}
          step={10}
          onChange={(value) => setValue(parsePrice(value))}
          onBlur={registerProps.onBlur}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>
          {formState.errors.pricePerNight?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}

export default PriceField;

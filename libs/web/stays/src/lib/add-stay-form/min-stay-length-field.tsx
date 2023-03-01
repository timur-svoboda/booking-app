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
export interface MinStayLengthFieldProps {}

export const formatStayLength = (value: string) =>
  Number.parseInt(value) === 1 ? `${value} day` : `${value} days`;

export const parseStayLength = (value: string) =>
  Number.parseInt(value).toString();

export function MinStayLengthField(props: MinStayLengthFieldProps) {
  const { register, formState } = useFormContext<StayFormData>();
  const registerProps = register('minimumLengthOfStay');
  const [value, setValue] = React.useState<string>(
    parseStayLength(formState.defaultValues?.minimumLengthOfStay || '')
  );
  React.useEffect(() => {
    registerProps.onChange({ target: registerProps.ref });
  }, [value]);

  return (
    <>
      <FormControl
        isInvalid={formState.errors.minimumLengthOfStay !== undefined}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel>Minimum length of stay</FormLabel>
        <NumberInput
          ref={registerProps.ref}
          name={registerProps.name}
          pattern="[0-9]*(.[0-9]+)?\sdays?"
          value={formatStayLength(value)}
          min={1}
          step={1}
          onChange={(value) => setValue(parseStayLength(value))}
          onBlur={registerProps.onBlur}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>
          {formState.errors.minimumLengthOfStay?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}

export default MinStayLengthField;

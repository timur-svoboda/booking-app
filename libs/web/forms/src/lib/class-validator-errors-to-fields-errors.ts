import { ValidationError } from 'class-validator';
import { FieldPath, FieldValues } from 'react-hook-form';

interface FieldError<TFieldValues extends FieldValues> {
  fieldName: FieldPath<TFieldValues>;
  errorMessage: string;
}

export const classValidatorErrorsToFieldsErrors = <
  TFieldValues extends FieldValues
>(
  errors: ValidationError[],
  parentFieldName?: FieldPath<TFieldValues>
): FieldError<TFieldValues>[] => {
  const fieldsErrors: FieldError<TFieldValues>[] = [];
  errors.forEach((error) => {
    const fieldName = parentFieldName
      ? `${parentFieldName}.${error.property}`
      : error.property;
    const selfFieldsErrors: FieldError<TFieldValues>[] = [];
    if (error.constraints !== undefined) {
      Object.values(error.constraints).forEach((errorMessage) => {
        selfFieldsErrors.push({
          fieldName: fieldName as FieldPath<TFieldValues>,
          errorMessage,
        });
      });
    }
    let childrenFieldsErrors: FieldError<TFieldValues>[] = [];
    if (error.children !== undefined) {
      childrenFieldsErrors = classValidatorErrorsToFieldsErrors(
        error.children,
        fieldName as FieldPath<TFieldValues>
      );
    }
    fieldsErrors.push(...selfFieldsErrors, ...childrenFieldsErrors);
  });
  return fieldsErrors;
};

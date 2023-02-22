import Joi from 'joi';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

type ValidationError<TFieldValues extends FieldValues = FieldValues> = {
  property: Path<TFieldValues>;
  constraints: {
    [type: string]: string;
  };
};

type HasValidationErrors<TFieldValues extends FieldValues = FieldValues> = {
  response: {
    data: {
      message: ValidationError<TFieldValues>[];
    };
  };
};

const hasValidationErrors = <TFieldValues extends FieldValues = FieldValues>(
  error: unknown,
  formData: TFieldValues
): error is HasValidationErrors<TFieldValues> => {
  const schema = Joi.object({
    response: Joi.object({
      data: Joi.object({
        message: Joi.array()
          .required()
          .items(
            Joi.object({
              property: Joi.string()
                .valid(...Object.keys(formData))
                .required(),
              constraints: Joi.object()
                .required()
                .pattern(Joi.string(), Joi.string()),
            }).unknown()
          ),
      }).unknown(),
    }).unknown(),
  }).unknown();

  const result = schema.validate(error);

  return result.error === undefined;
};

export const setValidationErrors = <
  TFieldValues extends FieldValues = FieldValues
>(
  error: unknown,
  FormData: new () => TFieldValues,
  setError: UseFormSetError<TFieldValues>
) => {
  if (!hasValidationErrors(error, new FormData())) return false;

  error.response.data.message.forEach((err) => {
    Object.values(err.constraints).forEach((constraint) => {
      setError(err.property, { message: constraint });
    });
  });

  return true;
};

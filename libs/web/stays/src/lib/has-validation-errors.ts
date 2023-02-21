import Joi from 'joi';
import { FieldValues } from 'react-hook-form';

type ValidationError<TFieldValues extends FieldValues = FieldValues> = {
  property: keyof TFieldValues;
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

export const hasValidationErrors = <
  TFieldValues extends FieldValues = FieldValues
>(
  value: unknown,
  formData: TFieldValues
): value is HasValidationErrors<TFieldValues> => {
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

  const result = schema.validate(value);

  return result.error === undefined;
};

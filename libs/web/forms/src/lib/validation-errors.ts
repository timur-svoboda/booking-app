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

export class ValidationErrors<TFieldValues extends FieldValues = FieldValues> {
  private schema: Joi.ObjectSchema<any>;

  constructor(
    private FormDataClass: new () => TFieldValues,
    private setError: UseFormSetError<TFieldValues>
  ) {
    this.schema = this.createSchema();
  }

  validateErrors(errors: unknown): errors is HasValidationErrors<TFieldValues> {
    return this.schema.validate(errors).error === undefined;
  }

  setErrors(errors: HasValidationErrors<TFieldValues>) {
    errors.response.data.message.forEach((error) => {
      Object.values(error.constraints).forEach((constraint) => {
        this.setError(error.property, { message: constraint });
      });
    });
  }

  private createSchema() {
    const formData = new this.FormDataClass();

    return Joi.object({
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
  }
}

export default ValidationErrors;

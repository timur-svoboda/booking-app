import { z } from 'zod';
import { ValidationError } from 'class-validator';

const BadRequestWithValidationErrorsSchema = z.object({
  statusCode: z.literal(400),
  message: z.string(),
  error: z.literal('Bad Request'),
  validationErrors: z.array(z.unknown()),
});

type BadRequestWithValidationErrors = z.infer<
  typeof BadRequestWithValidationErrorsSchema
> & {
  validationErrors: ValidationError[];
};

export const isBadRequestWithValidationErrors = (
  value: unknown
): value is BadRequestWithValidationErrors => {
  return BadRequestWithValidationErrorsSchema.safeParse(value).success;
};

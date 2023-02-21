import { BadRequestException, ValidationError } from '@nestjs/common';

export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  const message: Record<string, string[]> = {};

  validationErrors.forEach((error) => {
    const property = error.property;
    const errors = Object.values(error.constraints);
    message[property] = errors;
  });

  return new BadRequestException({
    error: 'Bad Request',
    statusCode: 400,
    message,
  });
};

export default exceptionFactory;

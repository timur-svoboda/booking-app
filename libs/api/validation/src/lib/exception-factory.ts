import { BadRequestException, ValidationError } from '@nestjs/common';

export const exceptionFactory = (validationErrors: ValidationError[] = []) => {
  return new BadRequestException({
    error: 'Bad Request',
    statusCode: 400,
    message: 'The request body must comply with the schema',
    validationErrors,
  });
};

export default exceptionFactory;

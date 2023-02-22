import { Length } from 'class-validator';
import { CreateStayDto as ICreateStayDto } from '@booking-app/shared/dtos';

export class CreateStayDto implements ICreateStayDto {
  @Length(3, 100, {
    message: 'It must be a string between 3 and 100 characters long',
  })
  title: string;

  @Length(80, 450, {
    message: 'It must be a string between 80 and 450 characters long',
  })
  description: string;
}

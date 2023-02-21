import { IsNumberString, IsString, Length } from 'class-validator';

export class CreateStayDto {
  @Length(3, 100, {
    message: 'It must be a string between 3 and 100 characters long',
  })
  title!: string;

  @Length(80, 450, {
    message: 'It must be a string between 80 and 450 characters long',
  })
  description!: string;
}

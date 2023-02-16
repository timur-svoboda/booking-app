import { IsString, Length } from 'class-validator';

export class CreateStayDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(80, 450)
  description: string;
}

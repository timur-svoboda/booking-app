import { PartialType } from '@nestjs/mapped-types';
import { UpdateStayDto as IUpdateStayDto } from '@booking-app/shared/dtos';
import { CreateStayDto } from './create-stay.dto';

export class UpdateStayDto
  extends PartialType(CreateStayDto)
  implements IUpdateStayDto {}

import { Injectable } from '@nestjs/common';
import { CreateStayDto } from './dto/create-stay.dto';

@Injectable()
export class StaysService {
  create(createStayDto: CreateStayDto) {
    return console.log(createStayDto);
  }
}

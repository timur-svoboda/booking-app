import { Controller, Post, Body } from '@nestjs/common';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Post()
  create(@Body() createStayDto: CreateStayDto) {
    return this.staysService.create({
      ownerId: 'github|39482339',
      ...createStayDto,
    });
  }
}

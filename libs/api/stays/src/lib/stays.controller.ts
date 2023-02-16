import { Controller, Post, Body } from '@nestjs/common';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { StayDto } from './dto/stay.dto';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Post()
  async create(@Body() createStayDto: CreateStayDto) {
    const stayDoc = await this.staysService.create({
      ownerId: 'github|39482339',
      ...createStayDto,
    });

    return new StayDto(stayDoc);
  }
}

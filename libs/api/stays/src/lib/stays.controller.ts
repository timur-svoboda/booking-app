import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '@booking-app/api/auth';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { StayDto } from './dto/stay.dto';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() createStayDto: CreateStayDto) {
    const stayDoc = await this.staysService.create({
      ownerId: 'github|39482339',
      ...createStayDto,
    });

    return new StayDto(stayDoc);
  }
}

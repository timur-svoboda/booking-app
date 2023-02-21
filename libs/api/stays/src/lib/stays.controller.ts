import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard, UserId } from '@booking-app/api/auth';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { StayDto } from './dto/stay.dto';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@UserId() userId: string, @Body() createStayDto: CreateStayDto) {
    const stayDoc = await this.staysService.create({
      ownerId: userId,
      ...createStayDto,
    });

    return new StayDto(stayDoc);
  }
}

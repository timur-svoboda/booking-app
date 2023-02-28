import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  UserId,
} from '@booking-app/api/auth';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { StayDto } from './dto/stay.dto';
import { StayImageDto } from './dto/stay-image.dto';
import {
  imageExtensionValidator,
  imageSizeValidator,
} from './image-validators';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('create:stays')
  @Post()
  async create(@UserId() userId: string, @Body() createStayDto: CreateStayDto) {
    const stayDoc = await this.staysService.create({
      hostId: userId,
      ...createStayDto,
    });

    return new StayDto(stayDoc);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('create:stays')
  @UseInterceptors(FileInterceptor('file'))
  @Post('images')
  createImage(
    @UploadedFile(imageExtensionValidator, imageSizeValidator)
    file: Express.Multer.File
  ): Promise<StayImageDto> {
    return this.staysService.createImage(file);
  }
}

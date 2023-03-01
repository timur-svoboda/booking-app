import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  JwtAuthGuard,
  Permissions,
  PermissionsGuard,
  UserId,
} from '@booking-app/api/auth';
import { ObjectIdValidationPipe } from '@booking-app/api/validation';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';
import { StayDto } from './dto/stay.dto';
import { StayImagesUrlsDto } from './dto/stay-images-urls.dto';
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

  @Get(':id')
  async getOne(@Param('id', ObjectIdValidationPipe) id: string) {
    const stayDoc = await this.staysService.getOne(id);
    return new StayDto(stayDoc);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('update:stays')
  @Patch(':id')
  async update(
    @Param('id', ObjectIdValidationPipe) id: string,
    @UserId() userId: string,
    @Body() updateStayDto: UpdateStayDto
  ) {
    const stayDoc = await this.staysService.update(id, {
      hostId: userId,
      ...updateStayDto,
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
  ): Promise<StayImagesUrlsDto> {
    return this.staysService.createImage(file);
  }
}

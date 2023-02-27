import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
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
import { ThumbnailDto } from './dto/thumbnail.dto';

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
  @Post('thumbnails')
  async createThumbnail(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /image\/*/ })],
        exceptionFactory: () =>
          new BadRequestException('File must be an image'),
      }),
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1e7 })],
        exceptionFactory: () =>
          new BadRequestException('Image size must be smaller than 10 MB'),
      })
    )
    file: Express.Multer.File
  ): Promise<ThumbnailDto> {
    return this.staysService.createThumbnail(file);
  }
}

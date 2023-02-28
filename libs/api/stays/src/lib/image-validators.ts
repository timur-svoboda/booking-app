import {
  BadRequestException,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

export const imageExtensionValidator = new ParseFilePipe({
  validators: [new FileTypeValidator({ fileType: /image\/*/ })],
  exceptionFactory: () => new BadRequestException('File must be an image'),
});

export const imageSizeValidator = new ParseFilePipe({
  validators: [new MaxFileSizeValidator({ maxSize: 1e7 })],
  exceptionFactory: () =>
    new BadRequestException('Image size must be smaller than 10 MB'),
});

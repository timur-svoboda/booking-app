import { Module } from '@nestjs/common';
import CloudStorageProvider from './cloud-storage.providers';

@Module({
  controllers: [],
  providers: [CloudStorageProvider],
  exports: [CloudStorageProvider],
})
export class CloudStorageModule {}

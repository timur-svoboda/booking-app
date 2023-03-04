import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudStorageModule } from '@booking-app/api/cloud-storage';
import { AuthModule } from '@booking-app/api/auth';
import { Stay, StaySchema } from './schemas/stay.schema';
import { StaysService } from './stays.service';
import { StaysController } from './stays.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stay.name, schema: StaySchema }]),
    AuthModule,
    CloudStorageModule,
  ],
  controllers: [StaysController],
  providers: [StaysService],
  exports: [StaysService],
})
export class StaysModule {}

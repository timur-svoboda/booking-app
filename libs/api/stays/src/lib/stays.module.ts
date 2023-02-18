import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@booking-app/api/auth';
import { Stay, StaySchema } from './schemas/stay.schema';
import { StaysService } from './stays.service';
import { StaysController } from './stays.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stay.name, schema: StaySchema }]),
    AuthModule,
  ],
  controllers: [StaysController],
  providers: [StaysService],
})
export class StaysModule {}

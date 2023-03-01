import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StaysModule } from '@booking-app/api/stays';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_URI),
    StaysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

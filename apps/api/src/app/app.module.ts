import { Module } from '@nestjs/common';
import { StaysModule } from '@booking-app/api/stays';

@Module({
  imports: [StaysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

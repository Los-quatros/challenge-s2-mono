import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsService } from './payments/payments.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,PaymentsService],
})
export class AppModule {}

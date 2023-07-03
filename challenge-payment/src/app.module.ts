import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [PaymentsModule,ConfigModule.forRoot(), OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
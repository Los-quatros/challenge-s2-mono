import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CarriersModule } from './carriers/carriers.module';



@Module({
  imports: [CarriersModule,ProductsModule,PaymentsModule,ConfigModule.forRoot(), OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

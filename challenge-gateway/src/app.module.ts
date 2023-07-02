import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SellersModule } from './sellers/sellers.module';
import { MailModule } from './mail/mail.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CarriersModule } from './carriers/carriers/carriers.module';
import { ReturnsController } from './returns/returns.controller';
import { ReturnsModule } from './returns/returns.module';
import { PaymentModule } from './payment/payment.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ReturnsModule ,UsersModule, AuthenticationModule, SellersModule, MailModule, ProductsModule, OrdersModule, CarriersModule, PaymentModule, ImagesModule],
  controllers: [AppController],
  providers: [],  
})
export class AppModule {}
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { CarriersModule } from './carriers/carriers/carriers.module';
import { ImagesModule } from './images/images.module';
import { MailModule } from './mail/mail.module';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ProductsModule } from './products/products.module';
import { ReturnsModule } from './returns/returns.module';
import { SellersModule } from './sellers/sellers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ReturnsModule,
    UsersModule,
    AuthenticationModule,
    SellersModule,
    MailModule,
    ProductsModule,
    OrdersModule,
    CarriersModule,
    PaymentModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

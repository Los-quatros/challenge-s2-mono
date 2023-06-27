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


@Module({
  imports: [UsersModule, AuthenticationModule, SellersModule, MailModule, ProductsModule, OrdersModule, CarriersModule, ReturnsModule],
  controllers: [AppController, ReturnsController],
  providers: [],  
})
export class AppModule {}
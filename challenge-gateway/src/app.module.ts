import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SellersModule } from './sellers/sellers.module';
import { MailModule } from './mail/mail.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [UsersModule, AuthenticationModule, SellersModule, MailModule, PaymentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

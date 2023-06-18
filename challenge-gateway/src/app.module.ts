import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [UsersModule, AuthenticationModule, SellersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

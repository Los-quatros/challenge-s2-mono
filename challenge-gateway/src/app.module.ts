import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

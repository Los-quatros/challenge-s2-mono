import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerModule } from './sellers/seller.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'sellers-db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sellers-db',
      entities: [], 
      synchronize: true,
    }),
    SellerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

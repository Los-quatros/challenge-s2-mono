import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';


@Module({
  imports: [
    ImagesModule,TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'images-db',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'images-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

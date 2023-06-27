import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { SeedService } from './users/seed/seed.service';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  }),
    SellersModule,
  ],
  controllers: [],
  providers: [SeedService],
  exports: [SeedService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

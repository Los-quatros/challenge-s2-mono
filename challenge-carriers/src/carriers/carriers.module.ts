import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriersController } from './carriers.controller';
import { CarriersService } from './carriers.service';
import { Carriers } from './entity/carriers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carriers])],
  controllers: [CarriersController],
  providers: [CarriersService]
})
export class CarriersModule {}

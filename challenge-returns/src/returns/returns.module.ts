import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Returns } from 'src/entity/entity.returns';
import { ReturnsController } from './returns.controller';
import { ReturnsService } from './returns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Returns])],
  controllers: [ReturnsController],
  providers: [ReturnsService]
})
export class ReturnsModule {}

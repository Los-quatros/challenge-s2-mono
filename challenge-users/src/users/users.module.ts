import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { SellersModule } from 'src/sellers/sellers.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), SellersModule, ImagesModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}

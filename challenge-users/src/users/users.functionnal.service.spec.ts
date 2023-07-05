import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

describe('UsersService (functional)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let usersRepository: Repository<User>;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'users-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'users-db-test', 
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

   //DECLARE 
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await usersRepository.clear(); 
  });

 
});

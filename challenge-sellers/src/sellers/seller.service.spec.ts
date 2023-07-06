import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { $Service } from './*.service';
import { $Module } from './*.module';
import { $ } from './entity/*.entity';
import { Repository } from 'typeorm';

describe('$Service (functional)', () => {
  let app: INestApplication;
  let *Service: $Service;
  let *Repository: Repository<$>;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        $Module,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '*-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: '*-db-test', 
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
    await *Repository.clear(); 
  });

 
});

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnsService } from './returns.service';
import { ReturnsModule } from './returns.module';
import { Returns } from '../entity/entity.returns';
import { Repository } from 'typeorm';

describe('ReturnsService (functional)', () => {
  let app: INestApplication;
  let returnsService: ReturnsService;
  let returnsRepository: Repository<Returns>;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ReturnsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'returns-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'returns-db-test', 
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
    await returnsRepository.clear(); 
  });

 
});

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsModule } from './products.module';
import { Product } from './Entity/product.entity';
import { Repository } from 'typeorm';

describe('ProductsService (functional)', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let productsRepository: Repository<Product>;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'products-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'products-db-test', 
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
    await productsRepository.clear(); 
  });

 
});

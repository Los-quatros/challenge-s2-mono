import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersModule } from './orders.module';
import { Order } from '../orders/entity/order.entity';
import { Repository } from 'typeorm';

describe('OrdersService (functional)', () => {
  let app: INestApplication;
  let ordersService: OrdersService;
  let ordersRepository: Repository<Order>;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        OrdersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'orders-db-test',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'orders-db-test', 
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
    await ordersRepository.clear(); 
  });

 
});

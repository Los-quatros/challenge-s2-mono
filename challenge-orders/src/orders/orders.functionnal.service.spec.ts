import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersModule } from './orders.module';
import { Order } from '../orders/entity/order.entity';
import { OrderProduct } from '../orders/entity/orderProduct.entity';

import { Repository } from 'typeorm';

describe('OrdersService (functional)', () => {
  let app: INestApplication;
  let ordersService: OrdersService;
  let ordersRepository: Repository<Order>;
  let createdOrder : Order;
  let orderProductRepository : Repository<OrderProduct>;

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

    ordersService = moduleFixture.get<OrdersService>(OrdersService);
    // orderProductRepository = moduleFixture.get<Repository<OrderProduct>>('OrderProductRepository')

  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // await ordersRepository.clear(); 
  });

  describe('CreateOrder', () => {
    it('should create a new order', async () => {
      const createOrderDto = {
        total: 100,
        carrier: 'carrierId',
        userId: 'userId',
        address: '123 Street',
        orderProducts: [
          {
            product_id: 'productId-12',
            quantity: 2,
          },
          // {
          //   product_id: 'productId-31',
          //   quantity: 2,
          // },
        ],
      };

      createdOrder = await ordersService.CreateOrder(createOrderDto);
      console.log('createOrder',createdOrder);
     
    });
  });

});

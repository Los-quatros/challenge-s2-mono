import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { MailsService } from '../emails/email.service';
import stripe, { Stripe } from 'stripe';
import { OrdersModule } from '../orders/orders.module';
import { ClientsModule, Transport,ClientProxy } from '@nestjs/microservices';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { MailsModule } from '../emails/email.module';

describe('PaymentsService', () => {
  let paymentsService: PaymentsService;
  let ordersService: OrdersService;
  let productsService: ProductsService;
  let usersService: UsersService;
  let mailsService: MailsService;
  let stripe: Stripe
  let orderProxy: ClientProxy


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        OrdersModule,
        ProductsModule,
        UsersModule,
        MailsModule
      ],

      providers: [
        PaymentsService,
        OrdersService,
        ProductsService,
        UsersService,
        MailsService,
        {
          provide: 'ORDERS_SERVICE', 
          useValue: { 
            send: jest.fn(),
          },
          
        },
        {
          provide: 'PRODUCTS_SERVICE', 
          useValue: { 
            send: jest.fn(),
          },
          
        },
        {
          provide: 'USERS_SERVICE', 
          useValue: { 
            send: jest.fn(),
          },
          
        },
        {
          provide: 'MAILS_SERVICE', 
          useValue: { 
            send: jest.fn(),
          },
          
        },
        
      ],
      
      
    }).compile();

    paymentsService = module.get<PaymentsService>(PaymentsService);
    ordersService = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
    usersService = module.get<UsersService>(UsersService);
    mailsService = module.get<MailsService>(MailsService);
    orderProxy = module.get<ClientProxy>('ORDERS_SERVICE'); 

  });

  describe('createCheckoutSession', () => {
    it('should create a checkout session', async () => {
      const mockData = {
        carrier: {
          name: 'Carrier Name',
          fees: '10',
        },
        products: [
          {
            product: {
              label: 'Product 1',
              price: '5',
            },
            quantity: 2,
          },
        ],
        orderId: 'orderId',
      };

      
      
      const result = await paymentsService.createCheckoutSession(mockData);
      const expectedData = { sessionId: result.sessionId , result: mockData };

      expect(result).toEqual(expectedData);
      
    });
  });
});

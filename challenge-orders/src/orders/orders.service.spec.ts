import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository,In } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderProduct } from './entity/orderProduct.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './models/CreateOrderDto';
import { Address, Carrier, OrderResponseDto, Product, OrderProductDto } from './models/ordersResponseDto';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: Repository<Order>;
  let orderProductRepository: Repository<OrderProduct>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(OrderProduct),
          useClass: Repository,
        },
        {
          provide: 'PRODUCTS_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    orderProductRepository = module.get<Repository<OrderProduct>>(getRepositoryToken(OrderProduct));
  });

  describe('GetUserOrders', () => {
    it('should return an array of OrderResponseDto', async () => {
      const userId = 'exampleUserId';
      const orders: Order[] = [
      ];
      jest.spyOn(orderRepository, 'findBy').mockResolvedValue(orders);
      jest.spyOn(service as any, 'GetOrdersWithProducts').mockResolvedValue([]);

      const result = await service.GetUserOrders(userId);

      expect(result).toEqual([]);
      expect(orderRepository.findBy).toHaveBeenCalledWith({ userId: userId['id'] });
      expect((service as any).GetOrdersWithProducts).toHaveBeenCalledWith(orders);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const userId = 'exampleUserId';
      jest.spyOn(orderRepository, 'findBy').mockRejectedValue(new Error());

      await expect(service.GetUserOrders(userId)).rejects.toThrow();
      expect(orderRepository.findBy).toHaveBeenCalledWith({ userId: userId['id'] });
    });
  });

  describe('CreateOrder', () => {
    it('should create an order and return the created order', async () => {
      const createdOrder = new Order();
      jest.spyOn(orderRepository, 'save').mockResolvedValue(createdOrder);

      const createdOrderProduct = new OrderProduct();
      jest.spyOn(orderProductRepository, 'save').mockResolvedValue(createdOrderProduct);

      jest.spyOn(orderRepository, 'update').mockResolvedValue(undefined);

      const createOrderDto = {
        total: 100,
        carrier: 'Carrier',
        userId: 'userId',
        address: 'Address',
        orderProducts: [
          {
            product_id: 'productId',
            quantity: 2,
          },
        ],
      };

      const result = await service.CreateOrder(createOrderDto);

      expect(result).toBe(createdOrder);

      expect(orderRepository.save).toHaveBeenCalledWith(expect.any(Order));
      expect(orderProductRepository.save).toHaveBeenCalledWith(expect.any(OrderProduct));
      expect(orderRepository.update).toHaveBeenCalledWith(
        { id: createdOrder.id },
        { orderProducts: expect.any(String) }
      );
    });
  });

  describe('GetOrders', () => {
    it('should return an array of OrderResponseDto', async () => {
      
      const orders = [new Order(), new Order()]; 
      jest.spyOn(orderRepository, 'find').mockResolvedValue(orders);

      const orderResponses = [new OrderResponseDto(
        'order123', 
        true, 
        new Address('address123'), 
        new Carrier('carrier123'), 
        [new OrderProductDto('product123', new Product('product123'), 2, false)] 
      ),
      new OrderResponseDto(
        'order1234', 
        true, 
        new Address('address123'), 
        new Carrier('carrier123'), 
        [new OrderProductDto('product123', new Product('product123'), 2, false)] 
      )
      ]
      ;
      jest.spyOn(service, 'GetOrdersWithProducts').mockResolvedValue(orderResponses);

      
      const result = await service.GetOrders();

      
      expect(result).toEqual(orderResponses);

      
      expect(orderRepository.find).toHaveBeenCalled();
      expect(service.GetOrdersWithProducts).toHaveBeenCalledWith(orders);
    });
  });

  describe('GetOrderProductsByProductsIds', () => {
    it('should return an array of OrderResponseDto', async () => {
      
      const orderProducts = [new OrderProduct(), new OrderProduct()]; 
      jest.spyOn(orderProductRepository, 'find').mockResolvedValue(orderProducts);

      
      const order = new Order(); 
      jest.spyOn(orderRepository, 'findOneBy').mockResolvedValue(order);

      
      const productIds = ['productId1', 'productId2']; 
      const result = await service.GetOrderProductsByProductsIds(productIds);

      
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(orderProducts.length);

      
      expect(orderProductRepository.find).toHaveBeenCalledWith({
        where: {
          product_id: In(productIds),
        },
      });
      expect(orderRepository.findOneBy).toHaveBeenCalledWith({ id: orderProducts[0].orderId });
      expect(orderRepository.findOneBy).toHaveBeenCalledWith({ id: orderProducts[1].orderId });
    });
  });

  
  

});

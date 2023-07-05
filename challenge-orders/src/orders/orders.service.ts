import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderProduct } from './entity/orderProduct.entity';
import { CreateOrderDto, CreateOrderProductDto } from './models/CreateOrderDto';
import { Address, Carrier, OrderResponseDto, Product, OrderProductDto } from './models/ordersResponseDto';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderProduct)
        private orderProductRepository: Repository<OrderProduct>,
    ) {

     }

    async GetUserOrders( userId : string ): Promise<Array<OrderResponseDto>> {
        try {
           const orders =  await this.ordersRepository.findBy({ userId : userId['id'] });
           return this.GetOrdersWithProducts(orders);
        } catch (error) {
           throw new HttpException({
             status: HttpStatus.INTERNAL_SERVER_ERROR,
             error: 'Error while fetching orders',
           }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async GetOrder(id : string) : Promise<Order> {
      return await this.ordersRepository.findOneBy({id : id});
    }

    async ValidateOrder(id : string) {
      return await this.ordersRepository.update({id : id}, {is_paid : true});
    }

    // TODO : to test (to be used after creating an return and we must do it from the gateway)
    async UpdateNbItemReturnedForOrderProduct(nbItemReturned : number, idOrderProduct : string){
      console.log(nbItemReturned)
      console.log(idOrderProduct)
      return await this.orderProductRepository.update({id : idOrderProduct['id']}, {nbProductReturned : nbItemReturned['quantity'], is_returned : true});
    }

    async CreateOrder( data : CreateOrderDto) : Promise<Order> {
      try {
        const order = new Order();
        order.total = data['total'];
        order.carrier = data['carrier'];
        order.userId = data['userId'];
        order.address = data['address'];

        const createdOrder = await this.ordersRepository.save(order);
        // Create and associate the orderProducts
        const orderProducts: OrderProduct[] = [];
        for (const item of data['orderProducts']) {
            const orderProduct = new OrderProduct();
            orderProduct.product_id = item['id_product'];
            orderProduct.quantity = item['quantity'];
            orderProduct.is_returned = false;
            orderProduct.orderId = order.id;
            orderProducts.push(orderProduct);
        }
        const createdOrderProducts = orderProducts.map(async item => { return await this.orderProductRepository.save(item)});

        let orderProductsIdsConcatenation: string;

        await Promise.all(createdOrderProducts.map(orderProduct => orderProduct.then(item => item.id)))
          .then(ids => {
              orderProductsIdsConcatenation = ids.join(';');
          });
        order.orderProducts = orderProductsIdsConcatenation;
        this.ordersRepository.update({id : order.id}, {orderProducts : orderProductsIdsConcatenation});
        return createdOrder;

    } catch (error) {
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while creating order',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    async GetOrders() : Promise<Array<OrderResponseDto>> {
      try {
        const orders = await this.ordersRepository.find();
        return this.GetOrdersWithProducts(orders);
      }catch(error){
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching orders',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async GetOrderProductsByProductsIds(productIds : Array<string>) : Promise<Array<OrderResponseDto>>{
      let orderProducts : Array<OrderProduct> = [];
      try {
        orderProducts = await this.orderProductRepository.find({where : {
          product_id: In(productIds)
        }});
      }catch(error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching orderProducts',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      };
      const result : Array<OrderResponseDto> = await Promise.all(orderProducts.map(async (elm) => {
        const orderProduct : OrderProduct = elm;
        const order : Order = await this.ordersRepository.findOneBy({id : orderProduct?.orderId});
        let orderProducts : Array<OrderProductDto> = [];
        orderProducts.push(new OrderProductDto(orderProduct?.id, new Product(orderProduct?.product_id), orderProduct?.quantity, orderProduct?.is_returned, undefined, orderProduct?.nbProductReturned));
        return new OrderResponseDto(order?.id, order?.is_delivered, new Address(order?.address), new Carrier(order?.carrier), orderProducts);
      }));
      return result;
    }

    async GetOrderProduct(id : string) : Promise<OrderProductDto>{
      const result = await this.orderProductRepository.findOneBy({id : id});
      return new OrderProductDto(result.id,  new Product(result.product_id),result.quantity, result.is_returned, result.orderId );
    }

    async ValidateOrDecline(decision: boolean, idOrder: string) {
      return await this.ordersRepository.update({id : idOrder}, {is_delivered : decision});
    }

    private async GetOrdersWithProducts(orders : Array<Order>) : Promise<Array<OrderResponseDto>> {
      try {
        const result : OrderResponseDto[] = []
        for(const order of orders) {
          const orderProductIds = order?.getOrderProductIds();
          const products: OrderProductDto[] = await Promise.all(orderProductIds.map(async (item) => {
            const orderProduct: OrderProduct = await this.orderProductRepository.findOneBy({ id: item });
            const product = new Product(orderProduct.product_id);
            return new OrderProductDto(orderProduct.id, product, orderProduct.quantity, orderProduct.is_returned, orderProduct.orderId);
          }));

          const carrier : Carrier = new Carrier(order.carrier);
          const address : Address = new Address(order.address);
          const ordersAggregated: OrderResponseDto = {
              orderId: order.id,
              total: order.total,
              is_delivered: order.is_delivered,
              address: address,
              carrier: carrier,
              is_paid: order.is_paid,
              userId: order.userId,
              orderProducts: products,
              createdAt: order.createdAt,
          }
          result.push(ordersAggregated);
        }
        return result;
      }catch(error) {
        console.log(error, "error");

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching products for orders',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }


    async GetProductsOrder(orderId: string) : Promise<any> {
      try {
        return await this.orderProductRepository.findBy({orderId : orderId});

      }catch(error){
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching orders',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async GetUserIdByOrderId(id : string) : Promise<Object>{
      try {
        const order : Order = await this.ordersRepository.findOneBy({id : id});
        return {
          userId : order.userId,
          total : order.total
        };
      }catch(error){

        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching user id by order id',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }



}

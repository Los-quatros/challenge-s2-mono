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
        @Inject("PRODUCTS_SERVICE") private productsProxy: ClientProxy
    ) { 
        
     }

    // si c'est un seller il faudra contacter alors penser a envoyer un event pour que le service seller ajoute l'id du produit au tabeau de produits du seller, si c'est un admin plus rien a faire
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

        console.log(order.getOrderProductIds());

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
        const order : Order = await this.ordersRepository.findOneBy({id : orderProduct.orderId});
        let orderProducts : Array<OrderProductDto> = [];
        orderProducts.push(new OrderProductDto(orderProduct.id, new Product(orderProduct.product_id), orderProduct.quantity, orderProduct.is_returned, undefined, orderProduct.nbProductReturned));
        return new OrderResponseDto(order.id, order.is_delivered, new Address(order.address), new Carrier(order.carrier), orderProducts);
      }));
      console.log(result);
      return result;
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
              orderProducts: products
          }
          result.push(ordersAggregated);
        }
        console.log(result);
         return result;
      }catch(error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching products for orders',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } 

    

}

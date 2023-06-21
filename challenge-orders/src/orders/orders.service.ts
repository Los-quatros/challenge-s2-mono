import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderProduct } from './entity/orderProduct.entity';
import { CreateOrderDto, CreateOrderProductDto } from './models/CreateOrderDto';
import { Carrier, OrderResponseDto, Product } from './models/OrdersResponseDto';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @Inject("PRODUCTS_SERVICE") private productsProxy: ClientProxy
    ) { 
        
     }

    // si c'est un seller il faudra contacter alors penser a envoyer un event pour que le service seller ajoute l'id du produit au tabeau de produits du seller, si c'est un admin plus rien a faire
    async GetUserOrders( userId : string ): Promise<Array<OrderResponseDto>> {
        try {
           const orders =  await this.ordersRepository.findBy({ userId : userId });
           return this.GetOrdersWithProducts(orders);
        } catch (error) {
           throw new HttpException({
             status: HttpStatus.INTERNAL_SERVER_ERROR,
             error: 'Error while fetching orders',
           }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async CreateOrder( data : CreateOrderDto) {
      try {
        const order = new Order();
        const OrderProducts : Array<OrderProduct> = data.orderProducts.map((item : CreateOrderProductDto) => {
          const orderProduct = new OrderProduct();
          orderProduct.order = order,
          orderProduct.is_returned = false,
          orderProduct.product_id = item.product_id,
          orderProduct.quantity = item.quantity
          return orderProduct;
        }) 
        this.ordersRepository.create({
          total : data.total,
          carrier : data.carrier,
          userId : data.userId,
          address : data.address,
          orderProducts : OrderProducts
        })

      }catch(error) {
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

    private async GetOrdersWithProducts(orders : Array<Order>) : Promise<Array<OrderResponseDto>> {
      try {
        const ordersWithProducts : OrderResponseDto[] = []
        orders?.forEach(order => {
          const orderProductIds = order?.getOrderProductIds();
          this.productsProxy.send('getProducts', orderProductIds).subscribe((products : Array<Product>) => {
                  const carrier : Carrier = new Carrier(order.carrier);
                  const orderWithProducts: OrderResponseDto = {
                      id: order.id,
                      total: order.total,
                      is_delivered: order.is_delivered,
                      address: order.address,
                      carrier: carrier,
                      is_paid: order.is_paid,
                      products: products
                  }
                  ordersWithProducts.push(orderWithProducts);
              });
         })
         return ordersWithProducts;
      }catch(error) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching products for orders',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } 
}

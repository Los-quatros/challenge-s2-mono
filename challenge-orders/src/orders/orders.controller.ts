import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './models/CreateOrderDto';
import { OrderProductDto } from './models/ordersResponseDto';
import { OrdersService } from './orders.service';

@Controller('products')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @EventPattern("GetUserOrders")
    async getUserOrders(@Payload() userId : string) {
        return this.ordersService.GetUserOrders(userId['userId']);
    }

    @EventPattern("CreateOrder")
    async createOrder(@Payload() createOrderDto : CreateOrderDto){
        return this.ordersService.CreateOrder(createOrderDto['data']);
    }

    @EventPattern("GetAllOrders")
    async getOrders() {
        return this.ordersService.GetOrders();
    }

    @EventPattern('GetOrderProductsByProducts')
    async getOrderProductsByProductsIds(@Payload() sellerProductsIds : Array<string>) {
        return this.ordersService.GetOrderProductsByProductsIds(sellerProductsIds['productIds']);
    }

    @EventPattern('UpdateNbItemReturned')
    async updateNbReturnedItemForOrderProduct(@Payload() id : string, @Payload() quantity : number){
        return this.ordersService.UpdateNbItemReturnedForOrderProduct(quantity, id);
    }  

    @EventPattern('GetOrderProduct')
    async getOrderProduct(@Payload() id : string) : Promise<OrderProductDto>{
        return this.ordersService.GetOrderProduct(id['idOrderProduct']);
    }

    @EventPattern('GetOrder')
    async getOrder(@Payload() id : string) {
        return this.ordersService.GetOrder(id['id']);
    }

    @EventPattern('AcceptOrDeclineOrderDelivery')
    async ModerateReturn(@Payload() data: any) {
        return this.ordersService.ValidateOrDecline(
        data['decision'],
        data['idOrder'],
    );
  }

    @EventPattern("GetProductsOrder")
    async getProductsOrder(orderId : string) {
        return this.ordersService.GetProductsOrder(orderId);
    }

}



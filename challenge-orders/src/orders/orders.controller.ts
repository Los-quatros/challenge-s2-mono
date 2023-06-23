import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './models/CreateOrderDto';
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

    @EventPattern('GetSellerSales')
    async getSellerSales() {

    }

}



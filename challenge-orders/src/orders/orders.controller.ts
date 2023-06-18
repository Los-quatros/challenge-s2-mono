import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller('products')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @EventPattern("GetUserOrders")
    async createProduct(@Payload() userId : string) {
        return this.ordersService.GetUserOrders(userId);
    }

}



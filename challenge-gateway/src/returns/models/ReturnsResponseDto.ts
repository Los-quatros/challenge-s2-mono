import { Address, Carrier, OrderProductDto } from "src/orders/models/ordersResponseDto";

export class ReturnsResponseDto {
    id : string;
    reason : string;
    orderProducts : Array<OrderProductDto>
    carrier : Carrier;
    address : Address;
    userId : string;
    status : string;
    constructor(id : string, reason : string, orderProducts : Array<OrderProductDto>, status : string, userId : string, carrier : Carrier, address : Address){
        this.id = id;
        this.orderProducts = orderProducts;
        this.reason = reason;
        this.status = status;
        this.userId = userId;
    }
}


import {
  Address,
  Carrier,
  OrderProductDto,
} from 'src/orders/models/ordersResponseDto';

export class UserDto {
    id : string;
    email : string;
    firstName : string;
    lastName : string;
    constructor(id : string){
        this.id = id;
    }

}

export class ReturnsResponseDto {
  id: string;
  reason: string;
  orderProducts: Array<OrderProductDto>;
  carrier: Carrier;
  address: Address;
  userId: string;
  status: string;
  createdAt?: Date;
  user : UserDto;
    constructor(id : string, reason : string, orderProducts : Array<OrderProductDto>, status : string, carrier : Carrier, address : Address, createdAt : Date, user : UserDto){
        this.id = id;
        this.orderProducts = orderProducts;
        this.reason = reason;
        this.status = status;
        this.carrier = carrier;
        this.address = address;
        this.createdAt = createdAt;
        this.user = user;
    }
}

 


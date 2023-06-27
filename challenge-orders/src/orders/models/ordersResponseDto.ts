export class Product {
    id: string;
    label: string;
    price: number;
    category: string;

    constructor(id : string){
        this.id = id;
    }
}

export class Carrier {
    id: string;
    fees: number;
    name: string;

    constructor(id : string){
        this.id = id;
    }
}

export class Address {
    id: string;
    state: string;
    zip: number
    country: string
    user_id: string
    city: string

    constructor(id : string){
        this.id = id;
    }
}

export class OrderProductDto {
    id : string;
    product : Product;
    quantity : number;
    orderId : string;
    is_returned : boolean;

    constructor(id : string, product : Product, quantity: number, is_returned : boolean, orderId : string){
        this.id = id;
        this.is_returned = is_returned;
        this.orderId = orderId;
        this.quantity = quantity;
        this.product = product;
    }
}

export class OrderResponseDto {
    id : string;
    total : number;
    is_delivered : boolean;
    address : Address;
    carrier : Carrier;
    is_paid : boolean;
    orderProducts : Array<OrderProductDto>;
    userId : string;
}
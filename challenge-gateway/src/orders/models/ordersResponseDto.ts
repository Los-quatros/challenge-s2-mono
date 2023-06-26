export class Product {
    id: string;
    label: string;
    price: number;
    category: string;
}

export class Carrier {
    id: string;
    fees: number;
    name: string;
}

export class Address {
    id: string;
    state: string;
    zip: number;
    country: string;
    user_id: string;
    city: string;
}

export class OrderProductDto {
    id : string;
    product : Product;
    quantity : number;
    orderId : string;
    is_returned : boolean;
    nbProductReturned? : number;

    constructor(id : string, product : Product, quantity: number, is_returned : boolean, orderId : string, nbProductReturned? : number){
        this.id = id;
        this.is_returned = is_returned;
        this.orderId = orderId;
        this.quantity = quantity;
        this.product = product;
        this.nbProductReturned = nbProductReturned;
    }
}


export class OrderResponseDto {
    orderId : string;
    total : number;
    is_delivered : boolean;
    address : Address;
    carrier : Carrier;
    is_paid : boolean;
    products : Array<OrderProductDto>;
}
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
    zip: number
    country: string
    user_id: string
    city: string
}


export class orderResponseDto {
    id : string;
    total : number;
    is_delivered : boolean;
    address : Address;
    carrier : Carrier;
    is_paid : boolean;
    products : Array<Product>;
}
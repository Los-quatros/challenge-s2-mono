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

    constructor(id : string){
        this.id = id;
    }
}


export class orderResponseDto {
    id : string;
    total : number;
    is_delivered : boolean;
    address : string;
    carrier : Carrier;
    is_paid : boolean;
    products : Array<Product>;
}
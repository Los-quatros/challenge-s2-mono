export class Product {
    id: string;
    label: string;
    price: number;
    category: string;
}


export class orderResponseDto {
    id : string;
    total : number;
    is_delivered : boolean;
    address : string;
    carriers : Array<string>;
    is_paid : boolean;
    products : Array<Product>;
}
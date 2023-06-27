export class CreateOrderProductDto {
    product_id : string;
    quantity : number;
}

export class CreateOrderDto {
    orderProducts : Array<CreateOrderProductDto>;
    total : number;
    address : string;
    userId : string;
    carrier : string;
}
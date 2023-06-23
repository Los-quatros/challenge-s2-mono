import { IsDefined, MinLength } from "class-validator";
export class CreateOrderProductDto {

    @IsDefined()
    id_product : string;

    @IsDefined()
    quantity : number;
}

export class CreateOrderDto {

    @IsDefined()
    orderProducts : Array<CreateOrderProductDto>;

    @IsDefined()
    total : number;

    @IsDefined()
    address : string;

    @IsDefined()
    userId : string;

    @IsDefined()
    carrier : string;
}
import { IsDefined, MinLength } from "class-validator";
export class CreateOrderProductDto {

    @IsDefined()
    id_product : string;

    @IsDefined()
    quantity : number;
}

export class CreateOrderDto {

    @IsDefined()
    @MinLength(1)
    orderProducts : Array<CreateOrderDto>;

    @IsDefined()
    total : number;

    @IsDefined()
    address : string;

    @IsDefined()
    userId : string;

    @IsDefined()
    carrier : string;
}
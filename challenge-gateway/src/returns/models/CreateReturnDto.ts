
import { IsDefined, MinLength } from "class-validator";
export class CreateOrderProductForReturnDto {

    @IsDefined()
    id_product : string;

    @IsDefined()
    nbItemReturned : number;
}

export class CreateReturnDto {

    orderProducts : Array<CreateOrderProductForReturnDto>;
    reason : string;
    total : number;
}
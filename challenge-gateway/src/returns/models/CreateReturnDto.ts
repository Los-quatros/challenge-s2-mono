
import { IsDefined, MinLength } from "class-validator";
export class CreateOrderProductDto {

    @IsDefined()
    id_product : string;

    @IsDefined()
    quantity : number;
}

export class CreateReturnDto {

    products : Array<CreateOrderProductDto>;
    reason : string;
    total : number;
}
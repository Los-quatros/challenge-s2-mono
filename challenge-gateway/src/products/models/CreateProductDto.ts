export class CreateProductDto {
    label : string;
    description : string;
    price : number;
    quantity : number;
    idSeller? : string;
}
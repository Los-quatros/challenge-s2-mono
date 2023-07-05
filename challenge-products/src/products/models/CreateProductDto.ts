export class CreateProductDto {
    label : string;
    description : string;
    price : number;
    quantity : number;
    category : string;
    idSeller? : string;
    idImage? : string;
}
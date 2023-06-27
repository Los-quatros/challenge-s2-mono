import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    label : string;

    @IsNotEmpty()
    description : string;

    @IsNotEmpty()
    @IsNumber()
    price : number;

    @IsNotEmpty()
    @IsNumber()
    quantity : number;

    @IsNotEmpty()
    idSeller : string;
}
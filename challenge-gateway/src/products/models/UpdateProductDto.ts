import { IsDefined } from "class-validator";

export class UpdateProductDto {

    label?: string;

    description?: string;

    price?: number;
    
    quantity?: number;
    
    category?: string;

    isActivated?: boolean;
}
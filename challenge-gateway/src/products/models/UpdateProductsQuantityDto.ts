import { MinLength } from "class-validator";

export type ProductUpdate = {
    id: string;
    quantity: number;
  };
  
  export class UpdateProductsQuantityDto {
    @MinLength(1)
    productsToUpdate: Array<ProductUpdate>;
  }
  
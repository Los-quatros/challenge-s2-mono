export type ProductUpdate = {
    id: string;
    quantity: number;
  };
  
  export class UpdateProductsQuantityDto {
    productsToUpdate: Array<ProductUpdate>;
  }
  
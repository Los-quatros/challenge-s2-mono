export class ProductUpdate {
    id: string;
    quantity: number;
    constructor(id : string, quantity: number){
        this.id = id;
        this.quantity = quantity;
    }
};
  
export class UpdateProductsQuantityDto {
    productsToUpdate: Array<ProductUpdate>;
    constructor(productsUpdate : Array<ProductUpdate>){
        this.productsToUpdate = productsUpdate;
    }
}
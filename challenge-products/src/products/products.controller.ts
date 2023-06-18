import { Controller } from '@nestjs/common';
import { CreateProductDto } from './models/CreateProductDto';
import { ProductsService } from './products.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantity';
import { Product } from './Entity/product.entity';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @EventPattern("createProduct")
    async createProduct(@Payload() product : CreateProductDto) : Promise<Product> {
        return this.productService.createProduct(product);
    }

    @EventPattern("updateProductsQuantity")
    async updateProductQuantity(@Payload() updateProductQuantity : UpdateProductsQuantityDto){
        return this.productService.updateProductsQuantity(updateProductQuantity);
    }

    @EventPattern("getAllProducts")
    async getAllProducts() : Promise<Array<Product>>{
        return this.productService.getAllProducts();
    }

    @EventPattern("getProducts")
    async getProductsByIds(@Payload() productIds : Array<string>) : Promise<Array<Product>>{
        return this.productService.getProductsByIds(productIds);
    }
}



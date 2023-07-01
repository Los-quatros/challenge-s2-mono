import { Controller } from '@nestjs/common';
import { CreateProductDto } from './models/CreateProductDto';
import { ProductsService } from './products.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantity';
import { Product } from './Entity/product.entity';
import { UpdateProductDto } from './models/UpdateProductDto';
import { Category } from './Entity/category.entity';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @EventPattern("createProduct")
    async createProduct(@Payload() product : CreateProductDto) : Promise<Product> {
        return this.productService.createProduct(product['product']);
    }

    @EventPattern("updateProductsQuantity")
    async updateProductQuantity(@Payload() updateProductQuantity : UpdateProductsQuantityDto){
        return this.productService.updateProductsQuantity(updateProductQuantity['updateProductsQuantityDto']);
    }

    @EventPattern("getAllProducts")
    async getAllProducts() : Promise<Array<Product>>{
        return this.productService.getAllProducts();
    }

    @EventPattern("getProduct")
    async getProductById(@Payload() productId : string) : Promise<Product>{
        return this.productService.getProductById(productId['value']);
    }

    @EventPattern('UpdateProduct')
    async updateProduct(@Payload() productId : string, @Payload() data : UpdateProductDto) {
        return this.productService.updateProduct(productId['productId']['id'], data['data']);
    }
    @EventPattern('GetAllCategories')
    async getCategories() : Promise<Array<Category>> {
        return this.productService.getCategories();
    }

    @EventPattern('GetSellerProducts')
    async getSellerProducts(@Payload() idSeller : string){
        return this.productService.getSellerProducts(idSeller['id']);
    }
}



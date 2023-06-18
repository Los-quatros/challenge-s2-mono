import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantityDto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    async Post(@Body(new ValidationPipe( {transform: true} )) product : CreateProductDto){
        return this.productsService.CreateProduct(product);
    }
    @Post("/update")
    async UpdateProductQuantity(@Body(new ValidationPipe( {transform: true} )) updateProductsQuantityDto : UpdateProductsQuantityDto){
        return this.productsService.UpdateProductsQuantity(updateProductsQuantityDto);
    }

    @Get("/all")
    async GetAllProducts(){
        return this.productsService.GetAllProducts();
    }
    @Get()
    async GetProductByIds(@Query('productIds') productIds: Array<string>){
        return this.productsService.GetProductsByIds(productIds);
    }


}

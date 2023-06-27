import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/products.dto';
import { SellerService } from 'src/sellers/seller.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {

    constructor(@Inject("PRODUCT_SERVICE") readonly productsProxy: ClientProxy, readonly sellersService: SellerService) {}

    @EventPattern("createProductsSeller")
    async createProduct(@Payload() data: CreateProductDto) {
        const result = await lastValueFrom(this.productsProxy.send("createProduct", data));
        await this.sellersService.addProductToSeller(data.idSeller, result.id);
        return result;
    }


}

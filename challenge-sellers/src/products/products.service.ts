import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/products.dto';
import { SellerService } from 'src/sellers/seller.service';

@Injectable()
export class ProductsService {

    constructor(@Inject("PRODUCT_SERVICE") readonly productsProxy: ClientProxy, readonly sellersService: SellerService) {}

    @EventPattern("createProducts")
    async createProduct(@Payload() data: CreateProductDto) {
        const result = await (await this.productsProxy.send("createProduct", data).toPromise());
        await this.sellersService.addProductToSeller(data.idSeller, result.id);
        return result;
    }


}

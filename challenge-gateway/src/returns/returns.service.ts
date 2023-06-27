import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateReturnDto } from './models/CreateReturnDto';

@Injectable()
export class ReturnsService {
    constructor(@Inject('PRODUCTS_SERVICE') private readonly returnsProxy: ClientProxy) {}

    async test() {
        const hadja = "hadja mlah";
        return this.returnsProxy.send('eventName', {hadja});
    }

    async CreateReturn(retrunDto : CreateReturnDto) {
        return this.returnsProxy.send('CreateReturn', {retrunDto});
    }
}

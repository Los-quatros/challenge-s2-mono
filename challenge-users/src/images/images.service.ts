import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ImagesService {
    constructor(@Inject('IMAGES_SERVICE') private readonly imagesProxy: ClientProxy) { }
    
    async imageFromIdRessource(data : any){
        const result = await lastValueFrom(this.imagesProxy.send('GetImageByRessource', data));
        return result;
    }
    
}

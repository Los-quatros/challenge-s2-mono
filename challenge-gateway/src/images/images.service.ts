import { Inject, Injectable, BadRequestException,UploadedFile } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGES_SERVICE') private readonly imagesProxy: ClientProxy,
  ) {}

  async uploadImage(file: any): Promise<any> {
    const image = {
      name: file.originalname,
      emplacementFile: file.path,
      userId: null, 
      productId: null,
    };
    const savedImage = await this.imagesProxy.send('saveImage', image).toPromise();
    return savedImage;
  }

}

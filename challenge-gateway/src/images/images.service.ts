import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AssociationType,
  ImagesAssociatedOn,
} from 'src/images/models/imageAssociatedOn';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGES_SERVICE') private readonly imagesProxy: ClientProxy,
  ) {}

  async uploadImage(
    file: any,
    associateImage?: ImagesAssociatedOn,
  ): Promise<any> {
    let payload: object;
    if (associateImage.type == AssociationType.Product) {
      payload = {
        name: file.originalname,
        emplacementFile: file.path,
        productId: associateImage.id,
      };
    } else {
      payload = {
        name: file.originalname,
        emplacementFile: file.path,
        userId: associateImage.id,
      };
    }
    const savedImage = await this.imagesProxy
      .send('saveImage', payload)
      .toPromise();
    return savedImage;
  }

  async getImage(id: any) {
    return await lastValueFrom(this.imagesProxy.send('getImage', { id }));
  }

  async getImageByIdRessource(imagesAssociatedOn: ImagesAssociatedOn) {
    console.log(imagesAssociatedOn);
  }
}

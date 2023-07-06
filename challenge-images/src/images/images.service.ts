import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entity/images.entity';
import {
  AssociationType,
  ImagesAssociatedOn,
} from './models/imageAssociatedOn';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGES_SERVICE') readonly imagesProxy: ClientProxy,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImage(image: Image): Promise<Image> {
    if (image.productId) {
      await this.imageRepository.delete({ productId: image.productId });
    }
    if (image.userId) {
      await this.imageRepository.delete({ userId: image.userId });
    }
    const savedImage = this.imageRepository.save(image);
    return savedImage;
  }

  async getImage(id: any): Promise<Image> {
    return await this.imageRepository.findOne({ where: { id } });
  }

  async getImageByIdRessource(data: ImagesAssociatedOn): Promise<Image> {
    let image;
    if (data.type == AssociationType.Product) {
      image = await this.imageRepository.findOneBy({ productId: data.id });
    } else {
      image = await this.imageRepository.findOneBy({ userId: data.id });
    }
    return image;
  }
}

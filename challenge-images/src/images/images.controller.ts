import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ImagesService } from './images.service';
import { Image } from '../entity/images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesAssociatedOn } from './models/imageAssociatedOn';

@Controller('/images')
export class ImagesController {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private readonly imagesService: ImagesService,
  ) {}

  @MessagePattern('saveImage')
  async saveImage(image: Image): Promise<Image> {
    const savedImage = await this.imagesService.uploadImage(image);
    return savedImage;
  }

  // can be a user ressource or product ressource only
  @MessagePattern('GetImageByRessource')
  async getImageByIdRessource(data: ImagesAssociatedOn): Promise<Image> {
    return await this.imagesService.getImageByIdRessource(data);
  }

  @MessagePattern('getImage')
  async getImage(@Payload('id') id: string): Promise<Image> {
    return await this.imagesService.getImage(id);
  }
}

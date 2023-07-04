import { All, Injectable,Inject,UploadedFile,UseInterceptors,NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entity/images.entity';



@Injectable()
export class ImagesService {
  constructor(@Inject("IMAGES_SERVICE") readonly imagesProxy: ClientProxy, @InjectRepository(Image) private readonly imageRepository: Repository<Image>) {}
 
  async uploadImage(file: any): Promise<Image> {
    const newImage = this.imageRepository.create({
      name: file.originalname,
      emplacementFile: file.path,
      productId: file.productId ? file.productId : null,
      userId: file.userId ? file.userId : null,

    });

    const savedImage = await this.imageRepository.save(newImage);
    return savedImage;
  }

  async getImage(id: any): Promise<Image> {
    return await this.imageRepository.findOne({where: {id}});
  }


}
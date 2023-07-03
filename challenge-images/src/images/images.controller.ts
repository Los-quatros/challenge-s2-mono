import {
    Body,
    Controller,
    Post,
    Res,
    Inject,
    UseInterceptors, UploadedFile
  } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from 'src/entity/images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

  
@Controller('/images')

export class ImagesController {
  constructor( @InjectRepository(Image)
  private imagesRepository: Repository<Image>) {}

  @MessagePattern('saveImage')
  async saveImage(@Body() image: Image): Promise<Image> {
    const savedImage = await this.imagesRepository.save(image);
    return savedImage;
  }
}
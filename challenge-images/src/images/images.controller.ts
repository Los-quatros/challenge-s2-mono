import {
    Body,
    Controller,
    Post,
    Res,
    Inject,
    UseInterceptors, UploadedFile
  } from '@nestjs/common';
import { MessagePattern,Payload } from '@nestjs/microservices';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Image } from '../entity/images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

  
@Controller('/images')

export class ImagesController {
  constructor( @InjectRepository(Image)
  private imagesRepository: Repository<Image>,
  private readonly imagesService: ImagesService) {}

  @MessagePattern('saveImage')
  async saveImage(@Body() image: Image): Promise<Image> {
    const savedImage = await this.imagesRepository.save(image);
    return savedImage;
  }
  @MessagePattern('getImage')
  async getImage(@Payload('id') id: string): Promise<Image> {
    
    return await this.imagesService.getImage(id);
  }
}
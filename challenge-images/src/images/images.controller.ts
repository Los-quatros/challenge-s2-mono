import {
    Body,
    Controller,
    Post,
    Res,
    Inject,
    UseInterceptors, UploadedFile
  } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';


  
@Controller('/images')

export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @EventPattern('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body() data: any) {
    const savedImage = await this.imagesService.uploadImage(data, file);


    return savedImage;
  }
}
import { Body, Controller, Get, Param, Patch, Post,UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';
import { lastValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(readonly imagesService: ImagesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: '/uploads/'
  }))
  async uploadImage(@UploadedFile() file: any): Promise<any> {
    const savedImage = await this.imagesService.uploadImage(file);
    return savedImage;
  }
}


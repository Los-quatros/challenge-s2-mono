import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ImagesService } from './images.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';
import { lastValueFrom } from 'rxjs';

@Controller('images')
export class ImagesController {
  constructor(readonly imagesService: ImagesService) {}

  @Post('/upload')
  async upload(image: any) {
    return await this.imagesService.uploadImage(image);
  }
}

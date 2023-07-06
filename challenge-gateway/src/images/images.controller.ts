import { Body, Controller, Get, Param, Patch, Post,UseInterceptors, UploadedFile,Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import {
  AuthenticationRequired,
  HasRole,
} from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';
import { lastValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Response } from 'express';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @AuthenticationRequired()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: '/uploads/'
  }))
  async uploadImage(@UploadedFile() file: any): Promise<any> {
    const savedImage = await this.imagesService.uploadImage(file);
    return savedImage;
  }

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response){
    const img = await this.imagesService.getImage(id);
    const fileReadStream = fs.createReadStream(img.emplacementFile);

    return fileReadStream.pipe(res);
  }

}


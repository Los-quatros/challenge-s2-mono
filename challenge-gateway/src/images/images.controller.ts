import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Response } from 'express';
import {
  AssociationType,
  ImagesAssociatedOn,
} from './models/imageAssociatedOn';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('/upload/:type/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: '/uploads/',
    }),
  )
  async uploadImage(
    @UploadedFile() file: any,
    @Param() type: string,
    @Param() idRessource: string,
  ): Promise<any> {
    let associationType: AssociationType;
    if (type['type'] == 'user') {
      associationType = AssociationType.User;
    } else {
      associationType = AssociationType.Product;
    }

    const savedImage = await this.imagesService.uploadImage(
      file,
      new ImagesAssociatedOn(idRessource['id'], associationType),
    );
    return savedImage;
  }

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const img = await this.imagesService.getImage(id);
    const fileReadStream = fs.createReadStream(img.emplacementFile);

    return fileReadStream.pipe(res);
  }
}

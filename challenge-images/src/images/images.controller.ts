import {
    Body,
    Controller,
    Post,
    Res,
    Inject
  } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ImagesService } from './images.service';

  
@Controller('/images')

export class ImagesController {
  constructor(private imagesService: ImagesService) {}

}
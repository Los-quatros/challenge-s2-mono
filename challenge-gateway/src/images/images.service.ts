import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGES_SERVICE') private readonly imagesProxy: ClientProxy,
  ) {}


}

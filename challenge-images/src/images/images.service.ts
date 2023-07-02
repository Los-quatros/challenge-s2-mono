import { All, Injectable,Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';



@Injectable()
export class ImagesService {
  constructor(@Inject("IMAGES_SERVICE") readonly imagesProxy: ClientProxy) {}


}
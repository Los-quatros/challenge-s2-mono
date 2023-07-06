import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from './images.service';
import { ImagesModule } from './images.module';
import { Image } from '../entity/images.entity';

describe('ImagesService (functional)', () => {
  let app: INestApplication;
  let imagesService: ImagesService;
  let upload : Image;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ImagesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host:  process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: 'images-db-test', 
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    imagesService = moduleFixture.get<ImagesService>(ImagesService);

  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
  });

  describe('uploadImage', () => {
    it('should upload a picture', async () => {
      const imageDto = {name:'img.png',emplacementFile:'/uploads/file' };

      upload = await imagesService.uploadImage(imageDto);

      expect(upload).toBeDefined();
    });

  });
 
});

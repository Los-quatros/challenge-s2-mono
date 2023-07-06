import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { ImagesService } from './images.service';
import { Image } from '../entity/images.entity';

describe('ImagesService', () => {
    let imagesService: ImagesService;
    let imagesRepository: Repository<Image>;
    let imagesProxy: ClientProxy;

    beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
        ImagesService,
        {
            provide: getRepositoryToken(Image),
            useClass: Repository,
        },
        {
            provide: 'IMAGES_SERVICE',
            useValue: {},
        },
        ],
    }).compile();

    imagesService = moduleRef.get<ImagesService>(ImagesService);
    imagesRepository = moduleRef.get<Repository<Image>>(getRepositoryToken(Image));
    imagesProxy = moduleRef.get<ClientProxy>('IMAGES_SERVICE');
    });

    describe('uploadImage', () => {
        it('should upload an image', async () => {
            const file = {
            originalname: 'image.jpg',
            path: '/path/to/image.jpg',
            };
            const newImage = { id: 1, name: file.originalname, emplacementFile: file.path };

            imagesRepository.create = jest.fn().mockReturnValue(newImage);
            imagesRepository.save = jest.fn().mockResolvedValue(newImage);

            const result = await imagesService.uploadImage(file);

            expect(imagesRepository.save).toHaveBeenCalledWith(newImage);
            expect(result).toEqual(newImage);
        });
    });

    describe('getImage', () => {
        it('should get an image by id', async () => {
          const imageId = 1;
          const image = { id: imageId, name: 'image.jpg', emplacementFile: '/path/to/image.jpg' };
    
          imagesRepository.findOne = jest.fn().mockResolvedValue(image);
    
          const result = await imagesService.getImage(imageId);
    
          expect(imagesRepository.findOne).toHaveBeenCalledWith({ where: { id: imageId } });
          expect(result).toEqual(image);
        });
    });

});

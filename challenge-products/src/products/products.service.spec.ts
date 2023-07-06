import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './Entity/product.entity';
import { Category } from './Entity/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from './images/images.service';
import { ImagesModule } from './images/images.module';
import { ClientsModule, Transport,ClientProxy } from '@nestjs/microservices';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productRepository: Repository<Product>;
  let categoryRepository: Repository<Category>;
  let productCreated : Product;
  let imagesProxy: ClientProxy


  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ImagesModule,
        
      ],
      providers: [
        ProductsService,
        ImagesService,
        {
          provide: getRepositoryToken(Product), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category), 
          useClass: Repository,
        },
        {
          provide: 'IMAGES_SERVICE', 
          useValue: { 
            send: jest.fn(),
          },
          
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productRepository = moduleRef.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    categoryRepository = moduleRef.get<Repository<Category>>(
      getRepositoryToken(Category),
    );

    productRepository.findOneBy = jest.fn().mockResolvedValue(Product);
    categoryRepository.findOneBy = jest.fn().mockResolvedValue(Category);
    imagesProxy = moduleRef.get<ClientProxy>('IMAGES_SERVICE'); 

   
  });


  describe('createProduct', () => {
    it('should create a product and return the result', async () => {
      const productDto = {
        label: 'Product 1',
        description: 'Product description',
        price: 10.99,
        quantity: 5,
        idSeller: 'seller1',
        category: 'category1',
      };

      const category = new Category();
      category.id = 'category1';

      const expectedResult = new Product();
      expectedResult.label = 'Product 1';
      expectedResult.description = 'Product description';
      expectedResult.price = 10.99;
      expectedResult.quantity = 5;
      expectedResult.sellerId = 'seller1';
      expectedResult.category = category;

      jest
        .spyOn(categoryRepository, 'findOneBy')
        .mockResolvedValue(category);
      jest.spyOn(productRepository, 'save').mockResolvedValue(expectedResult);

      productCreated = await productsService.createProduct(productDto);

      expect(productCreated).toEqual(expectedResult);
    });

    it('should throw an error if an exception occurs', async () => {
      const productDto = {
        label: 'Product 1',
        description: 'Product description',
        price: 10.99,
        quantity: 5,
        idSeller: 'seller1',
        category: 'category1',
      };

      await expect(productsService.createProduct(productDto)).rejects.toThrow(HttpException);
    });
  });
  
})
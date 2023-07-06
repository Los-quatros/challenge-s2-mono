import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './Entity/product.entity';
import { Category } from './Entity/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productRepository: Repository<Product>;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product), 
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category), 
          useClass: Repository,
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

      const result = await productsService.createProduct(productDto);

      expect(result).toEqual(expectedResult);
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


  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const expectedProducts = [new Product(), new Product()];

      jest.spyOn(productRepository, 'find').mockResolvedValue(expectedProducts);

      const result = await productsService.getAllProducts();

      expect(result).toEqual(expectedProducts);
    });

    it('should throw an error if an exception occurs', async () => {
      jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

      await expect(productsService.getAllProducts()).rejects.toThrow(HttpException);
    });
  });

  describe('getProductById', () => {
    it('should return the product with the specified ID', async () => {
      const productId = 'product1';
      const expectedProduct = new Product();
      expectedProduct.id = productId;

      jest
        .spyOn(productRepository, 'findOneBy')
        .mockResolvedValue(expectedProduct);

      const result = await productsService.getProductById(productId);

      expect(result).toEqual(expectedProduct);
    });
  
  });
})
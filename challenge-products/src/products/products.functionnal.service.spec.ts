import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsModule } from './products.module';
import { Product } from './Entity/product.entity';
import { Repository } from 'typeorm';
import { Category } from './Entity/category.entity';

describe('ProductsService (functional)', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let createdProduct: Product;



  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host:  process.env.DB_HOST,
          port: 5432,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: 'products-db-test', 
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    productsService = moduleFixture.get<ProductsService>(ProductsService);

  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productDto = {
        label: 'Test',
        description: 'Test Product',
        price: 10,
        quantity: 5,
        category: '7bbe7c9a-1b8f-11ee-be56-0242ac120002',
        idSeller: '4b6ba310-1b8f-11ee-be56-0242ac120002',
        idImage: '82c4326e-1b8f-11ee-be56-0242ac120002'
      };

      createdProduct = await productsService.createProduct(productDto);

      expect(createdProduct).toBeDefined();
     
    });

  });

  describe('updateProductsQuantity', () => {
    it('should update the quantities of products', async () => {
     
      const updateProductsQuantityDto = [
        { id: createdProduct.id, quantity: 2 },
      ];
      
      const updatedProducts = await productsService.updateProductsQuantity(updateProductsQuantityDto);
      
      expect(updatedProducts).toHaveLength(1);
      expect(updatedProducts[0].quantity).toBe(3);
    });
  });

  describe('GetAllCarriers', () => {
    it('should return all products', async () => {
      const products = await productsService.getAllProducts();

      expect(products).toBeDefined();
      
    });

    
  });
 
});

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './Entity/category.entity';
import { Product } from './Entity/product.entity';
import { ImagesService } from './images/images.service';
import {
  AssociationType,
  ImagesAssociatedOn,
} from './images/models/imageAssociatedOn';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductDto } from './models/UpdateProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private imagesService: ImagesService,
  ) {}

  // si c'est un seller il faudra contacter alors penser a envoyer un event pour que le service seller ajoute l'id du produit au tabeau de produits du seller, si c'est un admin plus rien a faire
  async createProduct(product: CreateProductDto): Promise<any> {
    try {
      const productToPersist = new Product();
      const categoryProduct = await this.categoryRepository.findOneBy({
        id: product['category'],
      });
      productToPersist.description = product['description'];
      productToPersist.label = product['label'];
      productToPersist.price = product['price'];
      productToPersist.quantity = product['quantity'];
      if (product['idSeller']) {
        productToPersist.sellerId = product['idSeller'];
      }
      productToPersist.category = categoryProduct;
      productToPersist.image = product['idImage'];
      const result = await this.productsRepository.save(productToPersist);
      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while creating product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProductsQuantity(
    updateProductsQuantityDto: Array<any>,
  ): Promise<Array<Product>> {
    const result: Array<Product> = [];
    for (const product of updateProductsQuantityDto) {
      try {
        const actualProduct: Product = await this.productsRepository.findOneBy({
          id: product['id'],
        });
        if (actualProduct.quantity < product['quantity']) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: 'can not update quantity product',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        actualProduct.quantity = actualProduct.quantity - product['quantity'];
        const productUpdated = await this.productsRepository.save(
          actualProduct,
        );
        result.push(productUpdated);
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Error while updating product quantity',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return result;
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const result: Product[] = await this.productsRepository.find({
        where: { isActivated: true },
        relations: ['category'],
      });
      const resultWithImages: Promise<Array<Product>> = Promise.all(
        result.map(async (elm: Product) => {
          const payload: ImagesAssociatedOn = new ImagesAssociatedOn(
            elm.id,
            AssociationType.Product,
          );
          const image = await this.imagesService.imageFromIdRessource(payload);
          elm.image = image;
          return elm;
        }),
      );
      return resultWithImages;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching all products',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllProductsAdmin(): Promise<Product[] | any> {
    try {
      const result: Product[] = await this.productsRepository.find({
        where: { isActivated: true },
        relations: ['category'],
      });
      const resultWithImages: Promise<Array<Product>> = Promise.all(
        result.map(async (elm: Product) => {
          const payload: ImagesAssociatedOn = new ImagesAssociatedOn(
            elm.id,
            AssociationType.Product,
          );
          const image = await this.imagesService.imageFromIdRessource(payload);
          elm.image = image;
          return elm;
        }),
      );
      return resultWithImages;
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error lors de la récupération des produits',
      };
    }
  }

  async getProductById(value: string): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id: value, isActivated: true },
        relations: ['category'],
      });
      const payload: ImagesAssociatedOn = new ImagesAssociatedOn(
        product.id,
        AssociationType.Product,
      );
      const image = await this.imagesService.imageFromIdRessource(payload);
      product.image = image;
      return product;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching products by ids',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(productId: string, data: UpdateProductDto) {
    try {
      const updateObject: Partial<Product> = {};
      if (data['label']) {
        updateObject.label = data['label'];
      }

      if (data['description']) {
        updateObject.description = data['description'];
      }

      if (data['price']) {
        updateObject.price = data['price'];
      }

      if (data['quantity']) {
        updateObject.quantity = data['quantity'];
      }

      if (data['category']) {
        const category = await this.categoryRepository.findOneBy({
          id: data['category'],
        });
        updateObject.category = category;
      }
      if (data['isActivated'] != undefined) {
        updateObject.isActivated = data['isActivated'];
      }

      return await this.productsRepository.update(
        { id: productId },
        updateObject,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while updating product',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCategories(): Promise<Array<Category>> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching categories',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCategory(category: string): Promise<Category | any> {
    try {
      const categoryToPersist = new Category();
      categoryToPersist.name = category;

      return await this.categoryRepository.save(categoryToPersist);
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error while creating category',
      };
    }
  }

  async getSellerProducts(sellerId: string): Promise<Array<Product>> {
    try {
      const result: Product[] = await this.productsRepository.find({
        where: { sellerId: sellerId },
        relations: ['category'],
      });
      const resultWithImages: Promise<Array<Product>> = Promise.all(
        result.map(async (elm: Product) => {
          const payload: ImagesAssociatedOn = new ImagesAssociatedOn(
            elm.id,
            AssociationType.Product,
          );
          const image = await this.imagesService.imageFromIdRessource(payload);
          elm.image = image;
          return elm;
        }),
      );
      return resultWithImages;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error while fetching products seller',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

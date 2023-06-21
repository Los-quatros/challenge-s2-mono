import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './Entity/category.entity';
import { Product } from './Entity/product.entity';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductDto } from './models/UpdateProductDto';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    // si c'est un seller il faudra contacter alors penser a envoyer un event pour que le service seller ajoute l'id du produit au tabeau de produits du seller, si c'est un admin plus rien a faire
    async createProduct(product: CreateProductDto ): Promise<Product> {
        try {
           return await this.productsRepository.save(product);
        } catch (error) {
           throw new HttpException({
             status: HttpStatus.INTERNAL_SERVER_ERROR,
             error: 'Error while creating product',
           }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProductsQuantity(updateProductsQuantityDto : UpdateProductsQuantityDto): Promise<any> {
        updateProductsQuantityDto.productsToUpdate.forEach(async product => {
            try{
                await this.productsRepository.decrement(
                    { id : product.id},
                    'quantity',
                    product.quantity
                )
            } catch(error) {
                throw new HttpException({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Error while updating product quantity',
                }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        })
    }

    async getAllProducts() : Promise<Product[]> {
        try{
            return await this.productsRepository.find();
        } catch(error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error while fetching all products',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProductsByIds(values : Array<string>) : Promise<Array<Product>>{
        try {
            return await this.productsRepository.findBy({ id: In (values) })
        } catch(error){
            throw new HttpException({
              status : HttpStatus.INTERNAL_SERVER_ERROR,
              error : 'Error while fetching products by ids',  
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(productId : string, data : UpdateProductDto) {
        try {
            const updateObject: Partial<Product> = {}; 
    
            if (data.label) {
            updateObject.label = data.label;
            }

            if (data.description) {
            updateObject.description = data.description;
            }

            if (data.price) {
            updateObject.price = data.price;
            }

            if (data.quantity) {
            updateObject.quantity = data.quantity;
            }

            if (data.category) {
            const category = await this.categoryRepository.findOneBy({id: data.category});
            updateObject.category = category;
            }
            if(data.isActivated) {
                updateObject.isActivated = data.isActivated;
            }

            return await this.productsRepository.update({id : productId}, updateObject);
        }catch(error) {
            throw new HttpException({
                status : HttpStatus.INTERNAL_SERVER_ERROR,
                error : 'Error while updating product',  
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCategories() : Promise<Array<Category>> {
        try {
            return await this.categoryRepository.find();
        }catch(error) {
            throw new HttpException({
                status : HttpStatus.INTERNAL_SERVER_ERROR,
                error : 'Error while fetching categories',  
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

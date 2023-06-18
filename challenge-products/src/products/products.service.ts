import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './Entity/product.entity';
import { CreateProductDto } from './models/CreateProductDto';
import { UpdateProductsQuantityDto } from './models/UpdateProductsQuantity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
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

}

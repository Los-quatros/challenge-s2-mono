import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): any {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    try {
      await this.usersRepository.delete(id);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error deleting user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async createUser(user: CreateUserDto): Promise<any> {

    const existingUser = await this.usersRepository.findOneBy({ email: user.email });
    if (existingUser) {
      return {
        status: HttpStatus.CONFLICT,
        error: 'Un utilisateur avec cet email existe déjà',
      }
    }
    
   try {

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;


    await this.usersRepository.save(user);

    return user;

   } catch (error) {

      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erreur lors de la création de l\'utilisateur',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async updateUser(id: string, updatedUser: UpdateUserDto): Promise<any> {
    try {
      await this.usersRepository.update(id, updatedUser);

      return "Utilisateur mis à jour avec succès";

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error updating user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

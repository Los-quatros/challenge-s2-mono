import { Injectable } from '@nestjs/common';
import { randomUUID } from "crypto"
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      return "User deleted successfully";

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error deleting user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }

  async createUser(user: CreateUserDto): Promise<any> {
   try {
      return "User created successfully";
   } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error creating user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
   }
  }

  async updateUser(id: string, updatedUser: UpdateUserDto): Promise<any> {
    try {
      await this.usersRepository.update(id, updatedUser);

      return "User updated successfully";

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error updating user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

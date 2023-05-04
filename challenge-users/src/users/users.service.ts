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
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): any {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  createUser(user: CreateUserDto): Promise<any> {

    return this.usersRepository.insert(user);

  }
  

  updateUser(id: string, updatedUser: UpdateUserDto): Promise<any> {  

   return this.usersRepository.update(id, updatedUser);
  }

}

import { ValidationPipe } from './users.pipe';
import { Controller, Get, HttpCode, Header, Param, Post, Body, Patch, Delete, HttpStatus, HttpException, UsePipes, UseInterceptors } from '@nestjs/common';
import { PasswordInterceptorUsersInterceptor } from "./interceptors/password-interceptor-users.interceptor"
import { PasswordInterceptorInterceptor } from './interceptors/password-interceptor.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @EventPattern("getUsers")
  async getUsers() {
    return this.usersService.findAll();
  }
  
  @EventPattern("getUser")
  async getUser(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @EventPattern("createUser")
  async createUser(@Payload() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @EventPattern('updateUser')
  async updateUser(@Payload() { id, user }: { id: string, user: UpdateUserDto }) {
    return this.usersService.updateUser(id, user);
  }
  

  @EventPattern("deleteUser")
  async deleteUser(@Payload() id: string) {
    return this.usersService.remove(id);
  }


}

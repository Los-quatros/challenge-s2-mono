import { ValidationPipe } from './users.pipe';
import { Controller, Get, HttpCode, Header, Param, Post, Body, Patch, Delete, HttpStatus, HttpException, UsePipes, UseInterceptors } from '@nestjs/common';
import { PasswordInterceptorUsersInterceptor } from "./interceptors/password-interceptor-users.interceptor"
import { PasswordInterceptorInterceptor } from './interceptors/password-interceptor.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(PasswordInterceptorUsersInterceptor)
  @Get()
  @HttpCode(200)
  @Header("X-School", "ESGI")
  async getUsers() {
    return this.usersService.findAll()
  }

  
  @UseInterceptors(PasswordInterceptorInterceptor)
  @Get(":user")
  @HttpCode(200)
  @Header("X-School", "ESGI")
  getUser(@Param("user") user: string) {
    const foundUser = this.usersService.findOne(user)

    if (foundUser) {
      return foundUser
    }

    throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
  }

  @Post()
  @HttpCode(201)
  @Header("X-School", "ESGI")
  createUser(@Body(new ValidationPipe()) user: CreateUserDto) {
   const response = this.usersService.createUser(user);
    return response;
  }

  @Patch(":user")
  @HttpCode(200)
  @Header("X-School", "ESGI")
  updateUser(@Body(new ValidationPipe()) user: UpdateUserDto, @Param("user") id: string) {
    this.usersService.updateUser(id, user);
  }

  @Delete(":user")
  @HttpCode(200)
  @Header("X-School", "ESGI")
  deleteUser(@Param("user") user: string) {
    this.usersService.remove(user);
  }
}

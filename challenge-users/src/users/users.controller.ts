import { Controller, Get, HttpCode, Header, Param, Post, Body, Patch, Delete, HttpStatus, HttpException, UsePipes, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AccountSellerDto } from './dto/account.seller.dto';

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

  @EventPattern("requestResetPassword")
  async requestResetPassword(@Payload() id: string) {
    return this.usersService.requestPasswordReset(id);
  }

  @EventPattern("resetPassword")
  async resetPassword(
    @Payload() { id, password, token }: { id: string, password: string, token: string },
  ) {
    return this.usersService.resetPassword(id, token, password);
  }

  @EventPattern("createSellerAccount")
  async createSellerAccount(@Payload() user: AccountSellerDto) {
    return this.usersService.createSellerAccount(user);
  }

}

import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(id);
    }

    @Post()
    createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body(new ValidationPipe()) UpdateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, UpdateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }

}
import { Controller, Get, Post, Body, Param, Delete, Put, Patch, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { UsersPipe } from './users.pipe';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { LoginRequest } from './authentication.request';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    @HttpCode(200)
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':uuid')
    @HttpCode(200)
    getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.usersService.getUser(uuid);
    }

    @Post()
    @HttpCode(201)
    createUser(@Body(new UsersPipe()) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    @HttpCode(200)
    updateUser(@Param('id') id: string, @Body(new UsersPipe()) UpdateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, UpdateUserDto);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body(new UsersPipe()) body: LoginRequest) {
        return this.usersService.login(body);
    }

}
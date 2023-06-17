import { Controller, Get, Post, Body, Param, Delete, Put, Patch, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { UsersPipe } from './users.pipe';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, resetPasswordDto } from './users.dto';
import { LoginRequest } from './authentication.request';
import { AuthenticationRequired, HasRole } from 'src/authentication/authentication.decorator';
import { Role } from 'src/authentication/authentication.enum';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @AuthenticationRequired()
    @HasRole(Role.ADMINISTRATOR)
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

    @Post('validate-user')
    @HttpCode(200)
    validateUser(@Body('jwtToken') jwtToken: string) {
        return this.usersService.validateUser(jwtToken);
    }

    @Post(':id/reset-password')
    @HttpCode(200)
    requestPasswordReset(@Param('id') id: string) {
        return this.usersService.requestPasswordReset(id);
    }

    @Patch(':id/reset-password/:token')
    resetPassword(
        @Param('id') id: string, 
        @Param('token') token: string,
        @Body(new UsersPipe()) updateUserDto: resetPasswordDto,
    ) {
        const { password } = updateUserDto;
        return this.usersService.resetPassword(id, password, token);
    }

    

}
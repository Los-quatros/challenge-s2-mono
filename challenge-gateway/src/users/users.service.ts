import { validate } from 'class-validator';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { response } from 'express';
import { LoginRequest } from './authentication.request';


@Injectable()
export class UsersService {
constructor(@Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy) {}

async getUsers() {
    return this.usersProxy.send('getUsers', {});
}

async getUser(id: string) {
    return this.usersProxy.send('getUser', id);
}

async createUser(user: any) {
    try {
        const result = await this.usersProxy.send('createUser', user).toPromise();
        if(!result.error) {
            return result;
        }
        throw new BadRequestException(result.error);
        
    } catch (error) {
        throw error;
    }

}

async updateUser(id, user: any) {
    return this.usersProxy.send('updateUser', { id, user });
}

async deleteUser(id: string) {
    return this.usersProxy.send('deleteUser', id);
}

async login(body: LoginRequest) {
    try {
        const result = await this.usersProxy.send('login', body).toPromise();
        if(!result.error) {
            return result;
        }
        throw new BadRequestException(result.error);
        
    } catch (error) {
        throw error;
    }
}

async validateUser(jwtToken: string) {
    return this.usersProxy.send('validate-user', jwtToken);
}

async requestPasswordReset(id: string) {
    return this.usersProxy.send('requestResetPassword', id);
}

async resetPassword(id: string, password: string, token: string) {
    return this.usersProxy.send('resetPassword', { id, password, token });
}

}

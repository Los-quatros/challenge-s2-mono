import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";


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
    return this.usersProxy.send('createUser', user);
}

async updateUser(id, user: any) {
    return this.usersProxy.send('updateUser', { id, user });
}

async deleteUser(id: string) {
    return this.usersProxy.send('deleteUser', id);
}

}

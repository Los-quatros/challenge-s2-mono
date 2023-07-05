import { lastValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy) {}
    
    async getUserEmail(id : string) : Promise<string>{
        return await lastValueFrom(this.usersProxy.send('getEmailById', id));
    }
}

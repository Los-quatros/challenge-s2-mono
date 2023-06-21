import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy} from "@nestjs/microservices";
import { LoginRequest } from './authentication.request';
import { last, lastValueFrom } from 'rxjs';
import { AccountSellerDto } from '../dto/accountSeller.dto';
import { UserDto } from 'src/dto/users.dto';
import { MailService } from 'src/mail/mail.service';


@Injectable()
export class UsersService {
constructor(
    @Inject('USERS_SERVICE') private readonly usersProxy: ClientProxy,
    private readonly mailService: MailService
) {}

async getUsers() {
    return this.usersProxy.send('getUsers', {});
}

async getUser(id: string) {
    return this.usersProxy.send('getUser', id);
}

async createUser(user: any) {
    try {
        const result = await lastValueFrom(this.usersProxy.send('createUser', user));
        if(!result.error) {
        
        await this.mailService.sendMailRegister(user.email);
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

async createSellerAccount(user: AccountSellerDto) {
    const result = await lastValueFrom(this.usersProxy.send('createSellerAccount', user));

    if(!result.error) {
        return result;
    }
    throw new BadRequestException(result.error);
}

async getUserBySellerId(id: string): Promise<UserDto> {
    return await lastValueFrom(this.usersProxy.send('getUserBySellerId', id));
}

}
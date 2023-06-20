import { MailService } from './../mail/mail.service';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateUserDto, UserDto } from 'src/dto/users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SellersService {
    constructor(
        @Inject('SELLERS_SERVICE') private readonly sellersProxy: ClientProxy,
        private readonly mailService: MailService,
        private readonly usersService: UsersService
    ) {
    }

    async getSellers() {
        return await lastValueFrom(this.sellersProxy.send('getSellers', {}));
    }

    async getSeller(id: string) {
        return await lastValueFrom(this.sellersProxy.send('getSeller', {id}));
    }

    async updateSeller(id: string, updateSellerDto: any) {
        return await lastValueFrom(this.sellersProxy.send('updateSeller', {id, updateSellerDto}));
    }
    
    
    async createProduct(createProductDto: any) {
        return await lastValueFrom(this.sellersProxy.send('createProduct', createProductDto));
    }

    async activateSeller(id: string) {
        try {
            lastValueFrom(this.sellersProxy.send('activeSeller', id));
            const user: any = await this.usersService.getUserBySellerId(id);
            if(user.error) {
                throw new BadRequestException(user.error);
            }

            await this.mailService.sendMailBecomeSellerAccepted(user.email);

            return 'Seller activated';

        } catch (error) {
            throw error;
        }
    }

    async deactivateSeller(id: string) {
        try {
            lastValueFrom(this.sellersProxy.send('refuseSeller', id));
            const user: any = await this.usersService.getUserBySellerId(id);
            if(user.error) {
                throw new BadRequestException(user.error);
            }

            await this.mailService.sendMailBecomeSellerRefused(user.email);

            return 'Seller desactivated';

        } catch (error) {
            throw error;
        }
    }
}

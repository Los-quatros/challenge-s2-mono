import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @EventPattern('becomeSellerMail')
    async sendMailBecameSeller(@Payload() email: string) {
        return await this.mailService.sendMailBecomeSeller(email);
    }

    @EventPattern('becomeSellerAcceptedMail')
    async sendMailBecameSellerAccepted(@Payload() email: string) {
        return await this.mailService.sendMailBecomeSellerAccepted(email);
    }

    @EventPattern('becomeSellerRefusedMail')
    async sendMailBecameSellerRefused(@Payload() email: string) {
        return await this.mailService.sendMailBecomeSellerRefused(email);
    }
    
    @EventPattern('registerMail')
    async sendMailRegister(@Payload() email: string) {
        return await this.mailService.sendMailRegister(email);
    }
    
}

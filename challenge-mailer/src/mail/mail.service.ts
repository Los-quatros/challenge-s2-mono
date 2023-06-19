import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: NestMailerService) {}

    /**
     * Charge le template en fonction du nom du template
     * @param templateName 
     * @returns 
     */
    private loadTemplate(templateName: string): string {
        const path = require('path');
        const templatePath = path.join(process.cwd(), 'src/mail/templates', `${templateName}.hbs`);
      
        return fs.readFileSync(templatePath, 'utf-8');
      }
      
      /**
       * Envoi email au vendeur pour lui dire que sa demande est en cours de traitement
       * @param email 
       * @param subject 
       * @returns 
       */
      async sendMailBecomeSeller(email: string): Promise<Object> {
        const templateName = 'become.seller'; 
        const subject = 'Votre demande de devenir vendeur est en cours de traitement';

        const templateContent = this.loadTemplate(templateName);
        const template = handlebars.compile(templateContent);
        const htmlContent = template({});
      
        await this.mailerService.sendMail({
          from: process.env.EMAIL_SERVER,
          to: email,
          subject: subject,
          html: htmlContent,
        });
      
        return {
          message: 'Email sent successfully',
        };
      }
      

      async sendMailBecomeSellerAccepted(email: string): Promise<Object> {
        const templateName = 'become.seller.accepted'; 
        const subject = 'Votre demande de devenir vendeur a été acceptée';

        const templateContent = this.loadTemplate(templateName);
        const template = handlebars.compile(templateContent);
        const htmlContent = template({});
      
        await this.mailerService.sendMail({
          from: process.env.EMAIL_SERVER,
          to: email,
          subject: subject,
          html: htmlContent,
        });
      
        return {
          message: 'Email sent successfully',
        };
      }

      async sendMailBecomeSellerRefused(email: string): Promise<Object> {
        const templateName = 'become.seller.refused';
        const subject = 'Votre demande de devenir vendeur a été refusée';

        const templateContent = this.loadTemplate(templateName);
        const template = handlebars.compile(templateContent);
        const htmlContent = template({});

        await this.mailerService.sendMail({
        from: process.env.EMAIL_SERVER,
        to: email,
        subject: subject,
        html: htmlContent,
        });

        return {
        message: 'Email sent successfully',
        };

     }

    async sendMailRegister(email: string): Promise<Object> {
        const templateName = 'confirm.register';
        const subject = 'Bienvenue sur notre site';

        const templateContent = this.loadTemplate(templateName);
        const template = handlebars.compile(templateContent);
        const htmlContent = template({});

        await this.mailerService.sendMail({
        from: process.env.EMAIL_SERVER,
        to: email,
        subject: subject,
        html: htmlContent,
        });

        return {
        message: 'Email sent successfully',
        };
    }
        
}

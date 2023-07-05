import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import { ContactDto } from "./dto/contact.dto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: NestMailerService) {}

  /**
   * Charge le template en fonction du nom du template
   * @param templateName
   * @returns
   */
  private loadTemplate(templateName: string): string {
    const path = require("path");
    const templatePath = path.join(
      process.cwd(),
      "src/mail/templates",
      `${templateName}.hbs`
    );

    return fs.readFileSync(templatePath, "utf-8");
  }

  /**
   * Envoi email au vendeur pour lui dire que sa demande est en cours de traitement
   * @param email
   * @param subject
   * @returns
   */
  async sendMailBecomeSeller(email: string): Promise<Object> {
    const templateName = "become.seller";
    const subject =
      "Votre demande de devenir vendeur est en cours de traitement";

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
      message: "Email sent successfully",
    };
  }

  async sendMailBecomeSellerAdvert(email: string): Promise<Object> {
    const templateName = "advert.admin.seller.demand";
    const subject = "Une nouvelle demande de vendeur est en attente";

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
      message: "Email sent successfully",
    };
  }

  async sendMailBecomeSellerAccepted(email: string): Promise<Object> {
    const templateName = "become.seller.accepted";
    const subject = "Votre demande de devenir vendeur a été acceptée";

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
      message: "Email sent successfully",
    };
  }

  async sendMailBecomeSellerRefused(email: string): Promise<Object> {
    const templateName = "become.seller.refused";
    const subject = "Votre demande de devenir vendeur a été refusée";

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
      message: "Email sent successfully",
    };
  }

  async sendMailRegister(email: string): Promise<Object> {
    const templateName = "confirm.register";
    const subject = "Bienvenue sur notre site";

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
      message: "Email sent successfully",
    };
  }

  async sendMailOrder(data: any): Promise<Object> {
    const templateName = "confirm.order";
    const subject = "Votre commande";

    const templateContent = this.loadTemplate(templateName);
    const template = handlebars.compile(templateContent);

    const { email, order } = data;
    
    const htmlContent = template({
      items: order.products,
      total: order.total,
    });

    await this.mailerService.sendMail({
      from: process.env.EMAIL_SERVER,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    return {
      message: "Email sent successfully",
    };
  }

  async sendMailRequestPassword(email: string, token: string): Promise<Object> {
    const templateName = "request.password";
    const subject = "Réinitialisation de votre mot de passe";

    const templateContent = this.loadTemplate(templateName);
    const template = handlebars.compile(templateContent);

    const resetLink = `${process.env.FRONT_URL}/reset-password?token=${token}`;
    const htmlContent = template({
      resetLink,
    });

    await this.mailerService.sendMail({
      from: process.env.EMAIL_SERVER,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    return {
      message: "Email sent successfully",
    };
  }

  async sendMailResetPassword(email: string): Promise<Object> {
    const templateName = "reset.password";
    const subject = "Votre mot de passe a été modifié";

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
      message: "Email sent successfully",
    };
  }

  async sendMailContact(data: ContactDto): Promise<Object> {
    const templateName = "contact";
    const subjectMail = "Nouveau message de contact";

    const templateContent = this.loadTemplate(templateName);
    const template = handlebars.compile(templateContent);

    const { emailAdmin, email, message, subject } = data;

    const htmlContent = template({
      email,
      subject,
      message,
    });

    await this.mailerService.sendMail({
      from: process.env.EMAIL_SERVER,
      to: emailAdmin,
      subject: subjectMail,
      html: htmlContent,
    });

    await this.sendMailContactConfirm(email);

    return {
      message: "Email sent successfully",
    };
  }

  async sendMailContactConfirm(email: string): Promise<Object> {
    const templateName = "contact.confirm";
    const subject = "Votre demande de contact a bien été envoyée.";

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
      message: "Email sent successfully",
    };
  }
}

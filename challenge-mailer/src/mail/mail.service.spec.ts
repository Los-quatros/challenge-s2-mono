import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendMailBecomeSeller', () => {
    it('should send email with correct template and subject', async () => {
      const email = 'test@example.com';

      await mailService.sendMailBecomeSeller(email);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        from: process.env.EMAIL_SERVER,
        to: email,
        subject: 'Votre demande de devenir vendeur est en cours de traitement',
        html: expect.any(String),
      });
    });
  });

  describe('sendMailBecomeSellerAdvert', () => {
    it('should send email with correct template and subject', async () => {
      const email = 'test@example.com';

      await mailService.sendMailBecomeSellerAdvert(email);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        from: process.env.EMAIL_SERVER,
        to: email,
        subject: 'Une nouvelle demande de vendeur est en attente',
        html: expect.any(String),
      });
    });
  });


});
